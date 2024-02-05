"use client";

import StoreContext from "@/contexts/store";
import { Banner } from "flowbite-react";
import { useContext } from "react";
import { HiOutlineInformationCircle, HiX } from "react-icons/hi";

const MinimumQuantity = () => {
  const {
    otherSettingsStore: { minimumQuantity },
  } = useContext(StoreContext);
  return (
    !!minimumQuantity && (
      <Banner>
        <div className="flex w-full items-center justify-between border-b border-gray-200 bg-gray-50 py mb-5 text-gray-500">
          <div className="mx-auto flex w-full items-center sm:w-auto">
            <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full">
              <HiOutlineInformationCircle className="h-4 w-4" />
            </span>
            <p className="text-sm font-medium md:m-0 md:mb-0">
              Quantidade mínima: {minimumQuantity} unidades
            </p>
          </div>
          <Banner.CollapseButton
            color="gray"
            className="border-0 bg-transparent text-gray-500"
          >
            <HiX className="h-4 w-4" />
          </Banner.CollapseButton>
        </div>
      </Banner>
    )
  );
};

export default MinimumQuantity;
