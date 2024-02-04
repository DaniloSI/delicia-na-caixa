export const jsonBinRequest = async (id, method = "GET", data = {}) => {
  const url = `https://api.jsonbin.io/v3/b/${id}/latest`;
  const options = {
    method,
    data,
    headers: { "X-Master-Key": process.env.BIN_MASTER_KEY },
  };
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return (await res.json()).record;
};
