'use client'

import StepperContext from "@/contexts/stepper";
import { getTotal, getTotalPrice } from "@/utils/calc";
import { Button } from "flowbite-react";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { FiSend } from 'react-icons/fi';

export default function Resume() {
  const { active, isLastActive, nextStep, prevStep } = useContext(StepperContext);
  const { watch } = useFormContext()

  const snacks = watch('snacks')
  const amount = getTotal(snacks)
  const subTotal = getTotalPrice(snacks)

  const btnLabelNext = ['Ir para a entrega', 'Ir para a finalização', 'Finalizar'][active]

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    nextStep()
  }

  return (
    <div className="fixed right-0 bottom-0 z-10 bg-white w-full p-2 border-t-2">
      <div className="max-w-96 m-auto">
        <div className="pb-2 pr-4 flex flex-col text-end">
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
            onClick={prevStep}
          >
            Voltar
          </Button>
          <Button
            key={btnLabelNext}
            type={isLastActive ? 'submit' : 'button'}
            onClick={isLastActive ? undefined : handleNext}
            size="sm"
            className="w-1/2 text-white bg-red-700 enabled:hover:bg-red-800 focus:ring-red-400"
          >
            {isLastActive && <FiSend className="mr-2 h-5 w-5" />}
            {btnLabelNext}
          </Button>
          {/* <button className="w-1/2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"></button> */}
        </div>
      </div>
    </div>
  );
}
