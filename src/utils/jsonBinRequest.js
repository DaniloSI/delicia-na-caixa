export const jsonBinRequest = async (id, method = "GET", data = {}) => {
  const isGet = method === "GET";
  const url = `https://api.jsonbin.io/v3/b/${id}${isGet ? "/latest" : ""}`;
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": process.env.BIN_MASTER_KEY,
    },
    body: !isGet ? JSON.stringify(data) : undefined,
  };
  const res = await fetch(url, options);
  const resJson = await res.json();

  if (!res.ok) {
    throw new Error({
      status: res.status,
      statusText: res.statusText,
      message: resJson.message,
    });
  }

  return {
    status: res.status,
    statusText: res.statusText,
    ...resJson,
  };
};
