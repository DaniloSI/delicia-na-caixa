"use client";

import React, { useMemo } from "react";

import StepperContainer from "@/components/Stepper/StepperContainer";

import StepperItem from "@/components/Stepper/StepperItem";
import Resume from "@/components/Order/Resume";
import { FormProvider, useForm } from "react-hook-form";

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
    },
  });

  const steps = useMemo(
    () => [
      { name: "Escolha", done: false },
      { name: "Entrega", done: false },
      { name: "Pagamento e identificação", done: false },
      { name: "Confirmação", done: false },
    ],
    []
  );

  return (
    <FormProvider {...methods}>
      <StepperContextProvider steps={steps}>
        <FormContainer>
          <StepperContainer>
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
