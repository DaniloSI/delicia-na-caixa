import React from "react";

import StoreContainer from "../components/StoreContainer";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }) {
  return <StoreContainer>{children}</StoreContainer>;
}
