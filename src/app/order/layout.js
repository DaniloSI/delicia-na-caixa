"use client";

import React, { useMemo } from "react";

import StepperContainer from "@/components/Stepper/StepperContainer";

import StepperItem from "@/components/Stepper/StepperItem";
import Resume from "@/components/Order/Resume";
import { FormProvider, useForm } from "react-hook-form";

import { getTotal } from "@/utils/calc";

import Divider from "@/components/Divider";
import FormContainer from "./components/FormContainer";
import { StepperContextProvider } from "@/contexts/stepper";

export default function OrderLayout({
  choices,
  delivery,
  payment,
  confirmation,
}) {
  const methods = useForm({
    defaultValues: {
      snacks: {},
      reception: "retire",
      cep: "",
    },
  });
  const { watch } = methods;

  const snacks = watch("snacks");

  const steps = useMemo(
    () => [
      { name: "Escolha", done: getTotal(snacks || {}) >= 100 },
      { name: "Retirada", done: false },
      { name: "Pagamento e identificação", done: false },
      { name: "Confirmação", done: false },
    ],
    [snacks]
  );

  return (
    <FormProvider {...methods}>
      <StepperContextProvider steps={steps}>
        <FormContainer>
          <StepperContainer steps={steps}>
            <Divider />

            <StepperItem step={0}>{choices}</StepperItem>
            <StepperItem step={1}>{delivery}</StepperItem>
            <StepperItem step={2}>{payment}</StepperItem>
            <StepperItem step={3}>{confirmation}</StepperItem>
          </StepperContainer>
          <Resume />
        </FormContainer>
      </StepperContextProvider>
    </FormProvider>
  );
}
