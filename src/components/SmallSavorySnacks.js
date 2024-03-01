"use client";

import React, { useCallback, useContext, useState } from "react";

import { useFormContext } from "react-hook-form";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { CldImage } from "next-cloudinary";
import { sendGAEvent } from "@next/third-parties/google";
import StoreContext from "@/contexts/store";
import { twMerge } from "tailwind-merge";

const QUANTITY_ADD_OR_REMOVE_CLICK = 10;

const SmallSavorySnacks = ({ snack }) => {
  const {
    name,
    fieldName: fieldNameOriginal,
    namePlural,
    description,
    image,
    unitWeightInGrams,
    type,
    available,
  } = snack;
  const { centPriceStore } = useContext(StoreContext);
  const { setValue, getValues } = useFormContext();
  const [tempValue, setTempValue] = useState();
  const [inputValue, setInputValue] = useState(0);
  const [showInputField, setShowInputField] = useState(false);

  const fieldName = `snacks.${namePlural}`;

  const updateCartGaEvent = useCallback(
    (event, quantity) => {
      sendGAEvent({
        event,
        ecommerce: {
          currency: "BRL",
          value: quantity * (centPriceStore[type] / 100),
          items: [
            {
              item_id: fieldNameOriginal,
              item_name: name,
              quantity: quantity,
            },
          ],
        },
      });
    },
    [centPriceStore, fieldNameOriginal, name, type]
  );

  const handleAdd = () => {
    const value = getValues(fieldName) || 0;

    if (value >= 1000) {
      return;
    }

    const newValue = value + QUANTITY_ADD_OR_REMOVE_CLICK;

    setValue(fieldName, newValue);
    setInputValue(newValue);

    updateCartGaEvent("add_to_cart", QUANTITY_ADD_OR_REMOVE_CLICK);

    if (value === 0) {
      setShowInputField(true);
    }
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

    if (newValue === 0) {
      setShowInputField(false);
    }
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
          crop="thumb"
          grayscale={!available}
        />
      </div>

      <div className="flex flex-col grow">
        <h5 className="text-lg font-medium tracking-tight text-gray-900">
          {name}
        </h5>
        <div className="flex items-start">
          <div className="grow">
            <p className="text-sm mb-1 font-normal text-gray-700">
              {description}
            </p>
            <div className="flex items-start">
              <span className="text-xs grow text-gray-500 font-light">
                Unidade: {unitWeightInGrams}g
              </span>
              {available ? (
                <div className="flex h-fit">
                  <button
                    type="button"
                    className={twMerge(
                      "btn btn-square btn-ghost btn-sm",
                      showInputField ? "" : "hidden"
                    )}
                    onClick={handleSubtract}
                  >
                    <HiMinusSm className="h-6 w-6 text-red-700" />
                  </button>
                  <input
                    inputMode="numeric"
                    className={`input input-bordered input-sm text-center w-16 ${
                      showInputField ? "" : "hidden"
                    }`}
                    value={inputValue}
                    onChange={(e) => {
                      let newValue = e.target.value.replaceAll(/\D/g, "");
                      let newValueNumber = Number(newValue);

                      if (newValueNumber > 1000) {
                        newValueNumber = 1000;
                        newValue = "1000";
                      }

                      setInputValue(newValue);
                      setValue(fieldName, newValueNumber);
                    }}
                    onFocus={(e) => setTempValue(Number(e.target.value))}
                    onBlur={(e) => {
                      const newValue = Number(e.target.value);
                      const difference = newValue - tempValue;

                      if (difference > 0) {
                        updateCartGaEvent("add_to_cart", difference);
                      } else if (difference < 0) {
                        updateCartGaEvent(
                          "remove_from_cart",
                          Math.abs(difference)
                        );
                      }

                      if (newValue === 0) {
                        setShowInputField(false);
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-square btn-ghost btn-sm"
                    onClick={handleAdd}
                  >
                    <HiPlusSm className="h-6 w-6 text-red-700" />
                  </button>
                </div>
              ): (
                <div className="badge badge-ghost text-xs">Indisponível</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallSavorySnacks;
