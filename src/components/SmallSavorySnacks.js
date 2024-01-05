'use client'

import React from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import TextInput from './TextInput';
import { Button } from 'flowbite-react';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';

const SmallSavorySnacks = ({ name, namePlural, description, image }) => {
  const { control, register, setValue, getValues } = useFormContext()
  const fieldName = `snacks.${namePlural}`

  const handleAdd = () => {
    const value = Number(getValues(fieldName))
    setValue(fieldName, value + 10)
  }

  const handleSubtract = () => {
    const value = Number(getValues(fieldName))
    setValue(fieldName, value > 10 ? value - 10 : '')
  }

  return (
    <div className="flex items-start bg-white flex-row max-w-xl">
      <img className="object-cover w-auto rounded-lg h-24" src={image} alt={name} />
      <div className="flex flex-col grow justify-between px-4 leading-normal">
        <h5 className="text-xl font-bold tracking-tight text-gray-900 ">
          {name}
        </h5>
        <p className="mb-1 font-normal text-gray-700 ">{description}</p>
        <div className="flex gap-4">
          <button onClick={handleSubtract}>
            <HiMinusSm className="h-6 w-6 text-red-700" />
          </button>
          <Controller
            render={({ field }) => (
              <TextInput
                {...field}
                type="number"
                placeholder="Quantidade"
                inputMode="numeric"
                className="text-center"
              />
            )}
            name={fieldName}
            control={control}
            defaultValue=""
          />
          <button onClick={handleAdd}>
            <HiPlusSm className="h-6 w-6 text-red-700" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SmallSavorySnacks;