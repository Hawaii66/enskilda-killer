import { getAccessToken } from "@/functions/getToken";
import { auth, currentUser } from "@clerk/nextjs";

export const useToken = () => {
  /*const msal = useMsal();

  const getToken = async () => {
    const token = (await new Promise((res) => {
      const t = getAccessToken(msal, {
        onSuccess: (t) => res(t),
      });
    })) as string;

    return token;
  };

  return getToken;*/

  //const { user } = currentUser();

  // console.log(user);

  return () => "";
};
