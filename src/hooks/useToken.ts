import { getAccessToken } from "@/functions/getToken";
import { useMsal } from "@azure/msal-react";

export const useToken = () => {
  const msal = useMsal();

  const getToken = async () => {
    const token = (await new Promise((res) => {
      const t = getAccessToken(msal, {
        onSuccess: (t) => res(t),
      });
    })) as string;

    return token;
  };

  return getToken;
};
