"use client";

import React, { useCallback, useContext, useState } from "react";

import { useFormContext } from "react-hook-form";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { CldImage } from "next-cloudinary";
import { Button, TextInput } from "flowbite-react";
import { sendGAEvent } from "@next/third-parties/google";
import StoreContext from "@/contexts/store";

const QUANTITY_ADD_OR_REMOVE_CLICK = 10;

const SmallSavorySnacks = ({ snack }) => {
  const { name, namePlural, description, image, unitWeightInGrams, type } =
    snack;
  const { centPriceStore } = useContext(StoreContext);
  const { watch, setValue, getValues } = useFormContext();
  const [tempValue, setTempValue] = useState();
  const [inputValue, setInputValue] = useState(0);

  const fieldName = `snacks.${namePlural}`;

  const fieldValue = watch(fieldName);

  const updateCartGaEvent = useCallback(
    (event, quantity) => {
      sendGAEvent({
        event,
        currency: "BRL",
        value: quantity * (centPriceStore[type] / 100),
        items: [
          {
            ...snack,
            quantity: quantity,
          },
        ],
      });
    },
    [centPriceStore, snack, type]
  );

  const handleAdd = () => {
    const value = getValues(fieldName) || 0;
    const newValue = value + QUANTITY_ADD_OR_REMOVE_CLICK;

    setValue(fieldName, newValue);
    setInputValue(newValue);

    updateCartGaEvent("add_to_cart", QUANTITY_ADD_OR_REMOVE_CLICK);
  };

  const handleSubtract = () => {
    const value = getValues(fieldName);
    const newValue =
      value > QUANTITY_ADD_OR_REMOVE_CLICK
        ? value - QUANTITY_ADD_OR_REMOVE_CLICK
        : 0;

    if (value > 0) {
      updateCartGaEvent("remove_from_cart", QUANTITY_ADD_OR_REMOVE_CLICK);
    }

    setValue(fieldName, newValue);
    setInputValue(newValue);
  };

  return (
    <div className="flex bg-white flex-row max-w-xl gap-4 items-center">
      <div className="min-w-16 w-16">
        <CldImage
          className="rounded-lg"
          src={"delicia-na-caixa/" + image}
          width="500"
          height="500"
          alt={name}
        />
      </div>

      <div className="flex flex-col grow">
        <h5 className="text-lg font-medium tracking-tight text-gray-900 ">
          {name}
        </h5>
        <div className="flex items-start">
          <div className="grow">
            <p className="text-sm mb-1 font-normal text-gray-700 ">
              {description}
            </p>
            <div className="flex items-start">
              <span className="text-xs grow text-gray-500 font-light">
                Unidade: {unitWeightInGrams}g
              </span>
            </div>
          </div>

          <div className="flex h-fit">
            <Button
              size="xs"
              color="light"
              className={`border-none focus:ring-0 focus:bg-none hover:enabled:bg-color-none ${
                fieldValue > 0 ? "" : "hidden"
              }`}
              onClick={handleSubtract}
            >
              <HiMinusSm className="h-6 w-6 text-red-700" />
            </Button>
            <TextInput
              inputMode="numeric"
              sizing="md"
              color="gray"
              className={`w-16 ${fieldValue > 0 ? "" : "hidden"}`}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value.replaceAll(/\D/g, ""));
              }}
              onFocus={(e) => setTempValue(Number(e.target.value))}
              onBlur={(e) => {
                const newValue = Number(e.target.value);
                const difference = newValue - tempValue;

                if (difference > 0) {
                  updateCartGaEvent("add_to_cart", difference);
                } else if (difference < 0) {
                  updateCartGaEvent("remove_from_cart", Math.abs(difference));
                }

                setValue(fieldName, newValue);
              }}
            />
            <Button
              size="xs"
              color="light"
              className="border-none focus:ring-0 focus:bg-none hover:enabled:bg-color-none py-2"
              onClick={handleAdd}
            >
              <HiPlusSm className="h-6 w-6 text-red-700" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallSavorySnacks;
