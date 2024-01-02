'use client'

import React from 'react';

import { useFormContext } from 'react-hook-form';

const SmallSavorySnacks = ({ name, description, image }) => {
  const { setValue } = useFormContext()

  return (
    <div className="flex items-start bg-white flex-row max-w-xl">
      <img className="object-cover w-auto rounded-lg h-24" src={image} alt={name} />
      <div className="flex flex-col grow justify-between px-4 leading-normal">
        <h5 className="text-xl font-bold tracking-tight text-gray-900 ">
          {name}
        </h5>
        <p className="mb-1 font-normal text-gray-700 ">{description}</p>
        <div>
          <input
            type="number"
            className="text-base border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
            placeholder="Quantidade"
            inputMode='numeric'
            onChange={(e) => setValue(`snacks.${name}`, e.target.value)}
            name={name}
          />
        </div>
      </div>
    </div>
  );
}

export default SmallSavorySnacks;