"use client";

import React, { useContext } from "react";

import SmallSavorySnacks from "@/components/SmallSavorySnacks";

import MinimumQuantity from "@/components/MiniumQuantity";
import Divider from "@/components/Divider";
import StoreContext from "@/contexts/store";

export default function Choices() {
  const { activeSnacks } = useContext(StoreContext);

  return (
    <>
      <MinimumQuantity />
      {activeSnacks.map(
        ({ name, namePlural, description, image, unitWeightInGrams }, index, list) => (
          <React.Fragment key={name}>
            <SmallSavorySnacks
              name={name}
              namePlural={namePlural}
              description={description}
              image={image}
              unitWeightInGrams={unitWeightInGrams}
            />

            {index < list.length - 1 && <Divider />}
          </React.Fragment>
        )
      )}
    </>
  );
}
