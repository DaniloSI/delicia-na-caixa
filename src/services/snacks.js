import { cache } from "react";

let cacheSnacks;

export const getSnacks = cache(async () => {
  if (!cacheSnacks) {
    const url = "https://api.jsonbin.io/v3/b/65bf6d92dc74654018a012e6/latest";
    const options = {
      headers: { "X-Master-Key": process.env.BIN_MASTER_KEY },
    };
    const res = await fetch(url, options);
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    cacheSnacks = res.json();
  }


  return cacheSnacks;
});
