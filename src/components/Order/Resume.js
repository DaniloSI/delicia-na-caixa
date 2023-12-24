'use client'

import StepperContext from "@/contexts/stepper";
import { getTotal } from "@/utils/calc";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const CENT_PRICE = 80

export default function Resume() {
  const { active, isLastActive, nextStep, prevStep } = useContext(StepperContext);
  const { watch } = useFormContext()

  const snacks = watch('snacks')
  const amount = getTotal(snacks)
  const subTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    (amount / 100) * CENT_PRICE,
  )

  const btnLabelNext = ['Ir para a entrega', 'Ir para a finalização', 'Finalizar'][active]

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    nextStep()
  }

  return (
    <div className="fixed right-0 bottom-0 z-10 bg-white w-full p-2 border-t-2">
      <div className="pb-2 pr-4 flex flex-col text-end">
        <p>Quantidade: {amount}</p>
        <p>Subtotal: {subTotal}</p>
      </div>

      <div className="flex justify-end">
        <button type="button" className={`${active === 0 ? 'hidden' : ''} py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200`} onClick={prevStep}>Voltar</button>
        <button key={btnLabelNext} type={isLastActive ? 'submit' : 'button'} className="w-1/2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none" onClick={isLastActive ? undefined : handleNext}>{btnLabelNext}</button>
      </div>
    </div>
  );
}
