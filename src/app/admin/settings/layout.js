import { Suspense } from "react";

import StoreContainer from "@/app/components/StoreContainer";
import Loading from "@/app/loading";

export const dynamic = "force-dynamic";

export default function SettingsLayout({ children }) {
  return (
    <Suspense fallback={<Loading />}>
      <StoreContainer>
        <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
      </StoreContainer>
    </Suspense>
  );
}
