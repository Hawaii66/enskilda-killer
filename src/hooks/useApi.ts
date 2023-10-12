import { useToken } from "./useToken";

export const useApi = () => {
  const getToken = useToken();

  const _fetch = async <T extends {}>(
    url: string,
    { method, body }: { method: "GET" | "POST"; body?: T }
  ) => {
    const token = await getToken();

    const t = url.includes("?")
      ? `${url}&token=${token}`
      : `${url}?token=${token}`;

    const response = await fetch(t, {
      method: method,
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    return response;
  };

  return _fetch;
};
