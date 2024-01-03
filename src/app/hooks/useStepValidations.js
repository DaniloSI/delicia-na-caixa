import StepperContext from "@/contexts/stepper";
import { getTotal } from "@/utils/calc";
import { useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";

export const stepValidations = {
  0: ({ snacks }) => getTotal(snacks) >= 100 ? '' : 'Adicione no mínimo 100 unidades',
  1: ({ time, reception, address: { cep, number } = {} }) => {
    if (!time) {
      return 'Adicione um horário'
    }

    if (reception === 'delivery') {
      if (!cep || cep.length !== 9) {
        return 'Adicione um endereço de entrega'
      }

      if (!number) {
        return 'Adicione o número do endereço'
      }
    }
    
    return ''
  },
  2: ({ payment }) => payment ? '' : 'Adicione uma forma de pagamento',
};

const useStepValidations = () => {
  const { active, addStepDone, removeStepDone } = useContext(StepperContext);
  const { getValues, watch } = useFormContext();

  const payment = watch('payment');

  const validateCurrentStep = () => stepValidations[active](getValues());
  const validateStep = (s) => stepValidations[s](getValues());
  const validateAll = () => Object.keys(stepValidations).map((_, i) => {
    const validationResult = validateStep(i)

    if (validationResult) {
      removeStepDone(i)
    } else {
      addStepDone(i)
    }

    return validationResult
  })

  useEffect(() =>{
    validateAll()
  }, [payment])

  return { validateCurrentStep, validateAll }
};

export default useStepValidations;