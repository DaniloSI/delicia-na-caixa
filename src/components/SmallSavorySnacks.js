"use client";

import React, { useContext } from "react";

import { Controller, useFormContext } from "react-hook-form";
import TextInput from "./TextInput";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { CldImage } from "next-cloudinary";
import StoreContext from "@/contexts/store";

const SmallSavorySnacks = ({ name, namePlural, description, image }) => {
  const { control, setValue, getValues } = useFormContext();
  const {
    otherSettingsStore: { unitWeightInGrams },
  } = useContext(StoreContext);

  const fieldName = `snacks.${namePlural}`;

  const handleAdd = () => {
    const value = Number(getValues(fieldName));
    setValue(fieldName, value + 10);
  };

  const handleSubtract = () => {
    const value = Number(getValues(fieldName));
    setValue(fieldName, value > 10 ? value - 10 : "");
  };

  return (
    <div className="flex bg-white flex-row max-w-xl gap-4 items-stretch">
      <CldImage
        className="object-cover rounded-lg w-1/4"
        src={"delicia-na-caixa/" + image}
        width="500"
        height="500"
        alt={name}
      />

      <div className="flex flex-col grow justify-between leading-normal">
        <h5 className="text-lg font-bold tracking-tight text-gray-900 ">
          {name}
        </h5>
        <p className="text-sm mb-1 font-normal text-gray-700 ">{description}</p>
        <div className="flex items-start">
          <span className="text-xs grow">Unidade: {unitWeightInGrams}g</span>
          <div className="flex gap-2">
            <button type="button" onClick={handleSubtract}>
              <HiMinusSm className="h-6 w-6 text-red-700" />
            </button>
            <Controller
              render={({ field }) => (
                <TextInput
                  {...field}
                  type="number"
                  placeholder="0"
                  inputMode="numeric"
                  sizing="xs"
                  className="w-16"
                />
              )}
              name={fieldName}
              control={control}
              defaultValue=""
            />
            <button type="button" onClick={handleAdd}>
              <HiPlusSm className="h-6 w-6 text-red-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallSavorySnacks;
