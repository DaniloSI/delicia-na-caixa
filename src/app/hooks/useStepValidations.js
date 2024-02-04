import StepperContext from "@/contexts/stepper";
import StoreContext from "@/contexts/store";
import { getTotal } from "@/utils/calc";
import { useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";

export const stepValidations = {
  0: ({ snacks }, minimumQuantity = 0) => getTotal(snacks) >= minimumQuantity ? '' : `Adicione no mínimo ${minimumQuantity} unidades`,
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
  const {
    otherSettingsStore: { minimumQuantity },
  } = useContext(StoreContext);
  const { getValues, watch } = useFormContext();

  const payment = watch('payment');

  const validateCurrentStep = () => stepValidations[active](getValues(), minimumQuantity);
  const validateStep = (s) => stepValidations[s](getValues(), minimumQuantity);
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