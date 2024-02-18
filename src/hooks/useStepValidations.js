import StepperContext from "@/contexts/stepper";
import StoreContext from "@/contexts/store";
import { getTotal } from "@/utils/calc";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const choiceValidation = ({ snacks }, minimumQuantity = 0) =>
  getTotal(snacks) >= minimumQuantity
    ? ""
    : `Adicione no mínimo ${minimumQuantity} unidades`;

const deliveryValidation = ({
  date,
  time,
  reception,
  address: { cep, number } = {},
}) => {
  if (!date) {
    return "Selecione uma data para receber o produto";
  }

  if (!time) {
    return "Adicione um horário para receber o produto";
  }

  if (reception === "delivery") {
    if (!cep || cep.length !== 9) {
      return "Adicione um endereço de entrega";
    }

    if (!number) {
      return "Adicione o número do endereço";
    }
  }

  return "";
};

const paymentValidation = ({ payment, fullName, phone }) => {
  if (!payment) {
    return "Adicione uma forma de pagamento";
  }

  if (!fullName) {
    return "Preencha o campo nome";
  }

  if (!phone) {
    return "Preencha o campo de telefone para contato";
  }

  return "";
};

export const stepValidations = {
  0: choiceValidation,
  1: deliveryValidation,
  2: paymentValidation,
  3: (...params) =>
    !choiceValidation(...params) &&
    !deliveryValidation(...params) &&
    !paymentValidation(...params)
      ? ""
      : "Erro ao validar",
};

const useStepValidations = () => {
  const { active, addStepDone, removeStepDone } = useContext(StepperContext);
  const {
    otherSettingsStore: { minimumQuantity },
  } = useContext(StoreContext);
  const { getValues } = useFormContext();

  const validateCurrentStep = () =>
    stepValidations[active](getValues(), minimumQuantity);

  const validateStep = (s) => stepValidations[s](getValues(), minimumQuantity);

  const validateAll = () =>
    Object.keys(stepValidations).map((_, i) => {
      const validationResult = validateStep(i);

      if (validationResult) {
        removeStepDone(i);
      } else {
        addStepDone(i);
      }

      return validationResult;
    });

  return { validateCurrentStep, validateStep, validateAll };
};

export default useStepValidations;
