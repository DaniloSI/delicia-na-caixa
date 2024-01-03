import StepperContext from "@/contexts/stepper";
import { getTotal } from "@/utils/calc";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

export const stepValidations = {
  0: ({ snacks }) => getTotal(snacks) >= 100 ? '' : 'Adicione no mínimo 100 unidades',
  1: ({ time, reception, address: { cep, number } }) => {
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
  const { active } = useContext(StepperContext);
  const { getValues } = useFormContext();

  const validateCurrentStep = () => stepValidations[active](getValues());
  const validateStep = (s) => stepValidations[s](getValues());
  const validateAll = () => Object.keys(stepValidations).map(validateStep)

  return { validateCurrentStep, validateStep, validateAll }
};

export default useStepValidations;