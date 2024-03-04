"use client";

import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FiArrowRight, FiSend } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

import StepperContext from "@/contexts/stepper";
import StoreContext from "@/contexts/store";
import useStepValidation from "@/hooks/useStepValidation";
import { getTotal, getTotalPrice } from "@/utils/calc";
import { formatPrice } from "@/utils/format";

import ConfirmSendOrder from "./ConfirmSendOrder";

export default function Resume() {
  const { active, isLastActive, nextStep, prevStep } =
    useContext(StepperContext);
  const { activeSnacks, centPriceStore } = useContext(StoreContext);
  const { watch } = useFormContext();
  const { validateStep } = useStepValidation();
  const confirmModalRef = useRef(null);

  const snacks = watch("snacks");
  const reception = watch("reception");
  const amount = getTotal(snacks);
  const subTotal = getTotalPrice(snacks, activeSnacks);

  const handleNext = async () => {
    if (isLastActive) {
      confirmModalRef.current.showModal();
      return;
    }

    const isValid = await validateStep(active);

    if (isValid) {
      nextStep();
    }
  };

  const handlePrev = async () => {
    await validateStep(active, false);
    prevStep();
  };

  const getFormattedPrice = (type) =>
    formatPrice(centPriceStore?.[type], { minimumFractionDigits: 0 });

  return (
    <div className="sticky bottom-0 right-0 flex items-end">
      <div className="w-full bg-white px-4 pb-4 pt-2 shadow-[0_0_10px_rgba(0,0,0,.1)]">
        <div className="m-auto max-w-96">
          {active === 0 && (
            <div className="flex items-stretch justify-between px-2 pb-3 pt-2 text-sm text-gray-500">
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
                active === 0 ? "invisible" : "",
              )}
              onClick={handlePrev}
            >
              Voltar
            </button>

            <button
              key={active}
              type="button"
              onClick={handleNext}
              className="btn btn-primary w-7/12"
            >
              {isLastActive ? (
                <>
                  <FiSend className="mr-2 size-5" />
                  Enviar pedido
                </>
              ) : (
                <>
                  Continuar
                  <FiArrowRight className="ml-2 size-5" />
                </>
              )}
            </button>

            <ConfirmSendOrder ref={confirmModalRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
