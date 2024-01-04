'use client'

import useStepValidations from "@/app/hooks/useStepValidations";
import StepperContext from "@/contexts/stepper";
import { getTotal, getTotalPrice } from "@/utils/calc";
import { Button } from "flowbite-react";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { FiSend } from 'react-icons/fi';

export default function Resume() {
  const { active, isLastActive, nextStep, prevStep, addStepDone, removeStepDone } = useContext(StepperContext);
  const { watch } = useFormContext()
  const { validateCurrentStep } = useStepValidations()

  const snacks = watch('snacks')
  const amount = getTotal(snacks)
  const subTotal = getTotalPrice(snacks)

  const btnLabelNext = ['Ir para a entrega', 'Ir para a finalização', 'Enviar pedido'][active]

  const handleNext = () => {
    const validationResult = validateCurrentStep()
    
    if (validationResult) {
      return toast.error(validationResult)
    }
    
    addStepDone(active)
    nextStep()
  }

  const handlePrev = () => {
    const validationResult = validateCurrentStep()
    
    if (validationResult) {
      removeStepDone(active)
    } else {
      addStepDone(active)
    }
    
    prevStep()
  }

  return (
    <div className="fixed right-0 bottom-0 z-10 bg-white w-full px-4 pb-4 pt-2 shadow-[0_0_10px_rgba(0,0,0,.1)]">
      <div className="max-w-96 m-auto">
        <div className="pb-2 pr-4 flex flex-col text-end text-gray-700">
          <p>Quantidade: {amount}</p>
          <p>Subtotal: {subTotal}</p>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            size="sm"
            outline
            color="light"
            className={active === 0 ? 'invisible' : ''}
            onClick={handlePrev}
          >
            Voltar
          </Button>
          <Button
            key={btnLabelNext}
            type={isLastActive ? 'submit' : 'button'}
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
