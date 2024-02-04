'use client'

import StoreContext from "@/contexts/store";

export default function StoreProvider({ value, children }) {
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
