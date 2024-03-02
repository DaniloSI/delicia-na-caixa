"use client";

import { sendGAEvent } from "@next/third-parties/google";
import React, { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import { encode } from "urlencode";
import { v4 as uuidv4 } from "uuid";

import { createOrder } from "@/app/actions";
import StoreContext from "@/contexts/store";
import useStepValidations from "@/hooks/useStepValidations";
import { getTotalPrice } from "@/utils/calc";
import getOrderMessage from "@/utils/getOrderMessage";

export default function FormContainer({ children }) {
  const {
    activeSnacks,
    centPriceStore,
    otherSettingsStore: { whatsAppNumber },
  } = useContext(StoreContext);
  const { handleSubmit } = useFormContext();

  const { validateCurrentStep } = useStepValidations();
  const sendRef = useRef(null);

  const onSubmit = handleSubmit(async (data) => {
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

    createOrder({ ...data, centPriceStore });

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
