"use client";

import { useMemo } from "react";
import { FormProvider as FormProviderRoot, useForm } from "react-hook-form";

import { StepperContextProvider } from "@/contexts/stepper";

export default function FormProvider({ children }) {
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
    [],
  );

  return (
    <FormProviderRoot {...methods}>
      <StepperContextProvider steps={steps}>{children}</StepperContextProvider>
    </FormProviderRoot>
  );
}
