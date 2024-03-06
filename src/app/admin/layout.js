import LogoStore from "@/components/LogoStore";

import TabNavigation from "./components/TabNavigation";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }) {
  return (
    <>
      <LogoStore />
      <TabNavigation />
      {children}
    </>
  );
}
