"use client";

import React, { useContext, useRef } from "react";

import { useFormContext } from "react-hook-form";
import { encode } from "urlencode";

import StoreContext from "@/contexts/store";

import getOrderMessage from "@/utils/getOrderMessage";
import { toast } from "react-toastify";
import useStepValidations from "@/hooks/useStepValidations";

import { v4 as uuidv4 } from 'uuid';
import { sendGAEvent } from "@next/third-parties/google";
import { getTotalPrice } from "@/utils/calc";

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

    const snacks = data.snacks;

    sendGAEvent({
      event: "purchase",
      ecommerce: {
        currency: "BRL",
        transaction_id: uuidv4(),
        value: getTotalPrice(snacks, activeSnacks),
        items: activeSnacks
          .map((s) => ({
            item_id: s.fieldName,
            item_name: s.name,
            quantity: snacks[s.namePlural] || 0,
            price: s.centPrice / 100,
          }))
          .filter((s) => s.quantity > 0),
      },
    });

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
