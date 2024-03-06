"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function TabNavigationLink({ href, label }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link className={twMerge("tab", isActive ? "tab-active" : "")} href={href}>
      {label}
    </Link>
  );
}
