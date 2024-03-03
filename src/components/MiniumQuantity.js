"use client";

import { useContext, useState } from "react";
import { HiOutlineInformationCircle, HiX } from "react-icons/hi";

import StoreContext from "@/contexts/store";

const MinimumQuantity = () => {
  const {
    otherSettingsStore: { minimumQuantity },
  } = useContext(StoreContext);
  const [showAlert, setShowAlert] = useState(!!minimumQuantity);

  return (
    showAlert && (
      <div
        role="alert"
        className="alert mb-4 grid-flow-col px-2 py-0 text-gray-500"
      >
        <HiOutlineInformationCircle className="size-4" />

        <span className="text-xs font-medium md:m-0">
          Quantidade mínima: {minimumQuantity} unidades
        </span>

        <button
          className="btn btn-ghost btn-sm"
          type="button"
          onClick={() => setShowAlert(false)}
        >
          <HiX className="size-4" />
        </button>
      </div>
    )
  );
};

export default MinimumQuantity;
