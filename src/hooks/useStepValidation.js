import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

import { stepsForm } from "@/app/order/lib/constants";
import StepperContext from "@/contexts/stepper";

export default function useStepValidation() {
  const { trigger, getValues } = useFormContext();
  const { setActiveStep, addStepDone, removeStepDone } =
    useContext(StepperContext);

  const validateStep = async (step, showToastError = true) => {
    const { fields = [] } = stepsForm[step];
    const isValid = await trigger(fields);

    if (!isValid) {
      removeStepDone(step);
      setActiveStep(step);

      if (!fields.includes("snacks") && showToastError) {
        toast.error("Preencha os campos obrigatórios");
      }

      return false;
    }

    if (fields.includes("address")) {
      const reception = getValues("reception");
      const address = getValues("address");

      if (reception === "delivery" && !address) {
        removeStepDone(step);
        setActiveStep(step);

        if (showToastError) {
          toast.error("Adicione um endereço de entrega");
        }

        return false;
      }
    }

    addStepDone(step);

    return true;
  };

  return { validateStep };
}
