"use client";

import { StepperContextProvider } from "@/contexts/stepper";
import { useMemo } from "react";
import { useForm, FormProvider as FormProviderRoot } from "react-hook-form";

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
    []
  );

  return (
    <FormProviderRoot {...methods}>
      <StepperContextProvider steps={steps}>{children}</StepperContextProvider>
    </FormProviderRoot>
  );
}
