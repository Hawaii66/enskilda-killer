export const useApi = () => {
  const _fetch = async <T extends {}>(
    url: string,
    { method, body }: { method: "GET" | "POST" | "DELETE" | "PUT"; body?: T }
  ) => {
    const response = await fetch(url, {
      method: method,
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    return response;
  };

  return _fetch;
};
