interface Options {
    method: 'DELETE' | 'GET' | 'POST' | 'PUT' | 'UPDATE'
    path: string;
    payload?: object;
    signal?: AbortSignal;
}

export const callAPI = async ({ method = 'GET', path, payload, signal }: Options) => {
    const response = await fetch(
        path,
        {
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            method,
            signal
        }
      );

      return await response.json();
};