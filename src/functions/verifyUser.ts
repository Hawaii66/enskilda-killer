import { auth, clerkClient } from "@clerk/nextjs";
import { supabase } from "./supabase";

type VerifiedInfo = {
  email?: string;
  id?: number;
};

export const VerifyEmail = async (): Promise<string> => {
  const { userId } = auth();
  const user = await clerkClient.users.getUser(userId || "");
  const email = user.emailAddresses[0].emailAddress;

  return email;
};

export const VerifyUser = async (): Promise<VerifiedInfo> => {
  const { userId } = auth();
  const user = await clerkClient.users.getUser(userId || "");
  const email = user.emailAddresses[0].emailAddress;

  if (!email) return {};

  const userWithId = await supabase()
    .from("users")
    .select("id, email")
    .eq("clerkId", userId || "")
    .single();
  if (userWithId.data) {
    return {
      email: userWithId.data.email,
      id: userWithId.data.id,
    };
  }

  const userWithEmail = await supabase()
    .from("users")
    .select("id, email")
    .eq("email", email)
    .single();
  if (userWithEmail.data) {
    return {
      email: userWithEmail.data.email,
      id: userWithEmail.data.id,
    };
  }

  return {};
};
