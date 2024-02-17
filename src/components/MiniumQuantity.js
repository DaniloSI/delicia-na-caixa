"use client";

import StoreContext from "@/contexts/store";
import { useContext, useState } from "react";
import { HiOutlineInformationCircle, HiX } from "react-icons/hi";

const MinimumQuantity = () => {
  const {
    otherSettingsStore: { minimumQuantity },
  } = useContext(StoreContext);
  const [showAlert, setShowAlert] = useState(!!minimumQuantity);

  return (
    showAlert && (
      <div role="alert" className="alert grid-flow-col p-2 mb-4 text-gray-500">
        <HiOutlineInformationCircle className="h-5 w-5" />

        <span className="text-sm font-medium md:m-0 md:mb-0">
          Quantidade mínima: {minimumQuantity} unidades
        </span>

        <button
          className="btn btn-sm"
          type="button"
          onClick={() => setShowAlert(false)}
        >
          <HiX className="h-4 w-4" />
        </button>
      </div>
    )
  );
};

export default MinimumQuantity;
