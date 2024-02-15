"use client";

import React, { useContext, useEffect } from "react";

import SmallSavorySnacks from "@/components/SmallSavorySnacks";

import MinimumQuantity from "@/components/MiniumQuantity";
import Divider from "@/components/Divider";
import StoreContext from "@/contexts/store";
import { sendGAEvent } from "@next/third-parties/google";

export default function Choices() {
  const { activeSnacks } = useContext(StoreContext);

  useEffect(() => {
    sendGAEvent({
      event: "view_item_list",
      items: activeSnacks.map(snack => ({
        item_id: snack.fieldName,
        item_name: snack.name,
        quantity: 1
      }))
    });
  }, [activeSnacks])

  return (
    <>
      <MinimumQuantity />
      {activeSnacks.map(
        (snack, index) => (
          <React.Fragment key={snack.name}>
            <SmallSavorySnacks snack={snack} />
            {index < activeSnacks.length - 1 && <Divider />}
          </React.Fragment>
        )
      )}
    </>
  );
}
