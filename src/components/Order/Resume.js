"use client";

import useStepValidations from "@/hooks/useStepValidations";
import StepperContext from "@/contexts/stepper";
import StoreContext from "@/contexts/store";
import { getTotal, getTotalPrice } from "@/utils/calc";
import { formatPrice } from "@/utils/format";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { FiArrowRight, FiSend } from "react-icons/fi";

import { toast } from "react-toastify";
import { HiOutlineArrowRight } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

export default function Resume() {
  const {
    active,
    isLastActive,
    nextStep,
    prevStep,
    addStepDone,
    removeStepDone,
  } = useContext(StepperContext);
  const { activeSnacks, centPriceStore } = useContext(StoreContext);
  const { watch } = useFormContext();
  const { validateCurrentStep } = useStepValidations();

  const snacks = watch("snacks");
  const reception = watch("reception");
  const amount = getTotal(snacks);
  const subTotal = getTotalPrice(snacks, activeSnacks);

  const handleNext = () => {
    const validationResult = validateCurrentStep();

    if (validationResult) {
      removeStepDone(active);
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
    <div className="grow flex items-end sticky right-0 bottom-0">
      <div className="bg-white w-full px-4 pb-4 pt-2 shadow-[0_0_10px_rgba(0,0,0,.1)]">
        <div className="max-w-96 m-auto">
          {active === 0 && (
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
                <p>
                  {reception === "retire" ? "Total" : "Subtotal"}: {subTotal}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className={twMerge(
                "btn btn-ghost w-5/12",
                active === 0 ? "invisible" : ""
              )}
              onClick={handlePrev}
            >
              Voltar
            </button>
            <button
              key={active}
              type={isLastActive ? "submit" : "button"}
              onClick={isLastActive ? undefined : handleNext}
              className="btn btn-primary w-7/12"
            >
              {isLastActive ? (
                <>
                  <FiSend className="mr-2 h-5 w-5" />
                  Enviar pedido
                </>
              ) : (
                <>
                  Continuar
                  <FiArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
