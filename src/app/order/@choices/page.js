"use client";

import { sendGAEvent } from "@next/third-parties/google";
import {
  descend as rDescend,
  prop as rProp,
  sortWith as rSortWith,
} from "ramda";
import React, { useContext, useEffect } from "react";

import Divider from "@/components/Divider";
import MinimumQuantity from "@/components/MiniumQuantity";
import SmallSavorySnacks from "@/components/SmallSavorySnacks";
import StoreContext from "@/contexts/store";
import { waitForConditionAndExecute } from "@/utils/wait-until";

export default function Choices() {
  const { activeSnacks } = useContext(StoreContext);

  useEffect(() => {
    waitForConditionAndExecute(
      () => window.gtag,
      5000,
      () => {
        sendGAEvent({
          event: "view_item_list",
          ecommerce: {
            items: activeSnacks.map((snack) => ({
              item_id: snack.fieldName,
              item_name: snack.name,
            })),
          },
        });
      },
    );
  }, [activeSnacks]);

  return (
    <>
      <MinimumQuantity />
      {rSortWith([rDescend(rProp("available"))])(activeSnacks).map(
        (snack, index) => (
          <React.Fragment key={snack.name}>
            <SmallSavorySnacks snack={snack} />
            {index < activeSnacks.length - 1 && <Divider className="my-3" />}
          </React.Fragment>
        ),
      )}
    </>
  );
}
