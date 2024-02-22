import React from "react";

import StepperContainer from "@/components/Stepper/StepperContainer";

import StepperItem from "@/components/Stepper/StepperItem";
import Resume from "@/components/Order/Resume";

import Divider from "@/components/Divider";
import FormContainer from "./components/FormContainer";
import FormProvider from "./components/FormProvider";

import StoreContainer from "../components/StoreContainer";

export const dynamic = "force-dynamic";

export default async function OrderLayout({
  choices,
  delivery,
  payment,
  confirmation,
}) {
  return (
    <StoreContainer>
      <FormProvider>
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
      </FormProvider>
    </StoreContainer>
  );
}
