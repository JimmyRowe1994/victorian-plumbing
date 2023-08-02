interface Options {
    method: 'DELETE' | 'GET' | 'POST' | 'PUT' | 'UPDATE'
    path: string;
    payload?: object;
}

export const callAPI = async ({ method = 'GET', path, payload }: Options) => {
    const response = await fetch(
        path,
        {
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            method,
        }
      );

      return await response.json();
};