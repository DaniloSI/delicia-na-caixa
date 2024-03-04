"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useMemo } from "react";
import { FormProvider as FormProviderRoot, useForm } from "react-hook-form";

import { StepperContextProvider } from "@/contexts/stepper";
import StoreContext from "@/contexts/store";

import { stepsForm } from "../lib/constants";
import { getSchema } from "../lib/schema";

export default function FormProvider({ children }) {
  const {
    otherSettingsStore: { minimumQuantity },
  } = useContext(StoreContext);
  const methods = useForm({
    defaultValues: {
      snacks: {
        quibes: 0,
      },
      reception: "retire",
    },
    resolver: zodResolver(getSchema({ minimumQuantity })),
  });

  const steps = useMemo(
    () => stepsForm.map((step) => ({ ...step, done: false })),
    [],
  );

  return (
    <FormProviderRoot {...methods}>
      <StepperContextProvider steps={steps}>{children}</StepperContextProvider>
    </FormProviderRoot>
  );
}
