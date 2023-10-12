import jwt from "jsonwebtoken";

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
    const decoded = jwt.verify(token, microsoftKey, { algorithms: ["RS256"] });
    if (decoded === null || typeof decoded === "string") {
      return false;
    }

    return {
      email: decoded.preferred_username,
    };
  } catch (e) {
    console.log(e, "ERROR");
    return false;
  }
};
