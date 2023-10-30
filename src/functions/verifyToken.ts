import { auth, clerkClient } from "@clerk/nextjs";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const validateToken = async (token: string) => {
  const keyURL = `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/discovery/keys?appid=${process.env.MICROSOFT_APP_ID}`;
  const decodedJWT = jwt.decode(token, { complete: true });

  if (decodedJWT === null) {
    return false;
  }

  const kid = decodedJWT.header.kid;

  const result = await fetch(keyURL);
  const data: { keys: any[] } = await result.json();
  if (
    data === null ||
    data === undefined ||
    data.keys === null ||
    data.keys === undefined
  ) {
    return false;
  }

  const microsoftPrivateKey = data.keys.find((i) => i.kid == kid).x5c;

  const microsoftKey = `-----BEGIN CERTIFICATE-----\n${microsoftPrivateKey}\n-----END CERTIFICATE-----`;

  try {
    const decoded = jwt.verify(token, microsoftKey, {
      algorithms: ["RS256"],
      clockTimestamp: 60 * 60 * 2,
      ignoreNotBefore: true,
    });
    if (decoded === null || typeof decoded === "string") {
      return false;
    }

    return {
      email: decoded.preferred_username as string,
    };
  } catch (e) {
    return false;
  }
};

export const VerifyWithEmail = async (request: NextRequest) => {
  /*const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const result = await validateToken(token || "");
  if (!result) {
    return undefined;
  }

  return result.email;*/

  const { userId } = auth();
  const t = await clerkClient.users.getUser(userId || "");
  const email = t.emailAddresses[0].emailAddress;


  return email;
};
