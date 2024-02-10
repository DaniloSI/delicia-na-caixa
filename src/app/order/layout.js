"use client";

import React, { useContext, useRef } from "react";

import StepperContainer from "@/components/Stepper/StepperContainer";

import StepperItem from "@/components/Stepper/StepperItem";
import Resume from "@/components/Order/Resume";
import { FormProvider, useForm } from "react-hook-form";
import { encode } from "urlencode";

import { getTotal } from "@/utils/calc";
import StoreContext from "@/contexts/store";

import getOrderMessage from "@/utils/getOrderMessage";
import Divider from "@/components/Divider";
import { getTomorrowDate } from "@/utils/date";

export default function OrderLayout({ choices, delivery, completion }) {
  const {
    activeSnacks,
    otherSettingsStore: { whatsAppNumber },
  } = useContext(StoreContext);
  const methods = useForm({
    defaultValues: {
      snacks: {},
      reception: "retire",
      cep: "",
      date: getTomorrowDate(),
    },
  });
  const sendRef = useRef(null);
  const { watch } = methods;

  const onSubmit = methods.handleSubmit((data) => {
    const message = encode(getOrderMessage(data, activeSnacks));

    sendRef.current.href = `whatsapp://send?phone=55${whatsAppNumber}&text=${message}`;
    sendRef.current.click();
  });

  const snacks = watch("snacks");

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <StepperContainer
          steps={[
            { name: "Escolha", done: getTotal(snacks || {}) >= 100 },
            { name: "Retirada", done: false },
            { name: "Finalização", done: false },
          ]}
        >
          <Divider />

          <StepperItem step={0}>{choices}</StepperItem>
          <StepperItem step={1}>{delivery}</StepperItem>
          <StepperItem step={2}>{completion}</StepperItem>

          <a ref={sendRef} href="#" className="hidden h-0 w-0">
            Send
          </a>

          <div className="h-36" />

          <Resume />
        </StepperContainer>
      </form>
    </FormProvider>
  );
}
