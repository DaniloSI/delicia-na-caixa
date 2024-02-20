"use client";

import React, { useContext, useRef } from "react";

import { useFormContext } from "react-hook-form";
import { encode } from "urlencode";

import StoreContext from "@/contexts/store";

import getOrderMessage from "@/utils/getOrderMessage";
import { toast } from "react-toastify";
import useStepValidations from "@/hooks/useStepValidations";

export default function FormContainer({ children }) {
  const {
    activeSnacks,
    otherSettingsStore: { whatsAppNumber },
  } = useContext(StoreContext);
  const { handleSubmit } = useFormContext();

  const { validateCurrentStep } = useStepValidations();
  const sendRef = useRef(null);

  const onSubmit = handleSubmit((data) => {
    const validationResult = validateCurrentStep();

    if (validationResult) {
      return toast.error(validationResult);
    }

    const message = encode(getOrderMessage(data, activeSnacks));

    sendRef.current.href = `whatsapp://send?phone=55${whatsAppNumber}&text=${message}`;
    sendRef.current.click();
  });

  return (
    <form onSubmit={onSubmit} className="grow flex flex-col">
      {children}
      <a ref={sendRef} href="#" className="hidden h-0 w-0">
        Send
      </a>
    </form>
  );
}
