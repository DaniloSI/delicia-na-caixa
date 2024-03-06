import React from "react";

import Divider from "@/components/Divider";
import LogoStore from "@/components/LogoStore";
import Resume from "@/components/Order/Resume";
import StepperContainer from "@/components/Stepper/StepperContainer";
import StepperItem from "@/components/Stepper/StepperItem";

import StoreContainer from "../components/StoreContainer";
import FormContainer from "./components/FormContainer";
import FormProvider from "./components/FormProvider";

export const dynamic = "force-dynamic";

export default async function OrderLayout({
  choices,
  delivery,
  payment,
  confirmation,
}) {
  return (
    <StoreContainer>
      <LogoStore />
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
