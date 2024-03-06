"use client";

import { usePathname } from "next/navigation";

import TabNavigationLink from "./TabNavigationLink";

export default function TabNavigation() {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    !isLoginPage && (
      <div role="navigation" className="tabs-boxed tabs mx-4 mt-2">
        <TabNavigationLink href="/admin/settings" label="Configurações" />
        <TabNavigationLink href="/admin/orders" label="Pedidos" />
      </div>
    )
  );
}
