"use client";

import React from "react";

import { Controller, useFormContext } from "react-hook-form";
import TextInput from "./TextInput";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { CldImage } from "next-cloudinary";
import { Button } from "flowbite-react";

const SmallSavorySnacks = ({
  name,
  namePlural,
  description,
  image,
  unitWeightInGrams,
}) => {
  const { control, setValue, getValues } = useFormContext();

  const fieldName = `snacks.${namePlural}`;

  const handleAdd = () => {
    const value = getValues(fieldName);
    setValue(fieldName, value + 10);
  };

  const handleSubtract = () => {
    const value = getValues(fieldName);
    setValue(fieldName, value > 10 ? value - 10 : 0);
  };

  return (
    <div className="flex bg-white flex-row max-w-xl gap-4 items-center">
      <div className="w-1/6">
        <CldImage
          className="object-cover object-top h-auto rounded-lg"
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
              <span className="text-xs grow">
                Unidade: {unitWeightInGrams}g
              </span>
            </div>
          </div>
          <Controller
            rules={{ valueAsNumber: true }}
            render={({ field: { onChange, value, ...rest } }) => (
              <div className="flex h-fit">
                <Button
                  size="xs"
                  color="light"
                  className={`border-none focus:ring-0 focus:bg-none hover:enabled:bg-color-none pt-2 ${
                    value > 0 ? "" : "hidden"
                  }`}
                  onClick={handleSubtract}
                >
                  <HiMinusSm className="h-6 w-6 text-red-700" />
                </Button>
                <TextInput
                  {...rest}
                  value={value}
                  onChange={onChange}
                  type="number"
                  placeholder="0"
                  inputMode="numeric"
                  sizing="xs"
                  className={`w-16 ${value > 0 ? "" : "hidden"}`}
                />
                <Button
                  size="xs"
                  color="light"
                  className="border-none focus:ring-0 focus:bg-none hover:enabled:bg-color-none pt-2"
                  onClick={handleAdd}
                >
                  <HiPlusSm className="h-6 w-6 text-red-700" />
                </Button>
              </div>
            )}
            name={fieldName}
            control={control}
            defaultValue=""
          />
        </div>
      </div>
    </div>
  );
};

export default SmallSavorySnacks;
