import { Suspense } from "react";

import Loading from "@/app/loading";

export const dynamic = "force-dynamic";

export default function OrdersLayout({ children }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
