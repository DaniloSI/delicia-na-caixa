"use client";

import useStepValidations from "@/hooks/useStepValidations";
import StepperContext from "@/contexts/stepper";
import StoreContext from "@/contexts/store";
import { getTotal, getTotalPrice } from "@/utils/calc";
import { formatPrice } from "@/utils/format";
import { Button } from "flowbite-react";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { FiSend } from "react-icons/fi";

import { toast } from "react-toastify";

export default function Resume() {
  const {
    active,
    isLastActive,
    nextStep,
    prevStep,
    addStepDone,
    removeStepDone,
  } = useContext(StepperContext);
  const { activeSnacks, centPriceStore } =
    useContext(StoreContext);
  const { watch } = useFormContext();
  const { validateCurrentStep } = useStepValidations();

  const snacks = watch("snacks");
  const reception = watch("reception");
  const amount = getTotal(snacks);
  const subTotal = getTotalPrice(snacks, activeSnacks);

  const btnLabelNext = [
    "Ir para a entrega",
    "Ir para a finalização",
    "Enviar pedido",
  ][active];

  const handleNext = () => {
    const validationResult = validateCurrentStep();

    if (validationResult) {
      return toast.error(validationResult);
    }

    addStepDone(active);
    nextStep();
  };

  const handlePrev = () => {
    const validationResult = validateCurrentStep();

    if (validationResult) {
      removeStepDone(active);
    } else {
      addStepDone(active);
    }

    prevStep();
  };

  const getFormattedPrice = (type) =>
    formatPrice(centPriceStore?.[type], { minimumFractionDigits: 0 });

  return (
    <div className="fixed right-0 bottom-0 z-10 bg-white w-full px-4 pb-4 pt-2 shadow-[0_0_10px_rgba(0,0,0,.1)]">
      <div className="max-w-96 m-auto">
        <div className="flex justify-between items-stretch text-sm text-gray-500 pb-3 pt-2 px-2">
          <div className="flex flex-col">
            <p>
              Salgado: {getFormattedPrice("partySnacks")}{" "}
              <span className="text-xs">(cento)</span>
            </p>
            <p>
              Mini churros: {getFormattedPrice("miniChurros")}{" "}
              <span className="text-xs">(cento)</span>
            </p>
          </div>

          <div className="flex flex-col">
            <p>Quantidade: {amount}</p>
            <p>{reception === 'retire' ? 'Total' : 'Subtotal'}: {subTotal}</p>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            size="sm"
            outline
            color="light"
            className={`w-1/2 ${active === 0 ? "invisible" : ""}`}
            onClick={handlePrev}
          >
            Voltar
          </Button>
          <Button
            key={btnLabelNext}
            type={isLastActive ? "submit" : "button"}
            onClick={isLastActive ? undefined : handleNext}
            size="sm"
            color="primary"
            className="w-1/2"
          >
            {isLastActive && <FiSend className="mr-2 h-5 w-5" />}
            {btnLabelNext}
          </Button>
        </div>
      </div>
    </div>
  );
}
