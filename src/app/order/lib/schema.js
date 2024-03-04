import { sum } from "ramda";
import { z } from "zod";

const REQUIRED_FIELD_MESSAGE = "Campo obrigatório";

export const getSchema = (settings) => {
  const { minimumQuantity } = settings;

  return z.object({
    snacks: z
      .record(z.number())
      .refine((s) => sum(Object.values(s)) >= minimumQuantity, {
        message: `Adicione no mínimo ${minimumQuantity} itens`,
      }),
    date: z.date({
      required_error: "Selecione uma data para receber sua encomenda",
      invalid_type_error: "Data inválida",
    }),
    time: z.string({
      required_error: "Selecione um horário para receber sua encomenda",
    }),
    payment: z.string({
      required_error: "Adicione uma forma de pagamento",
    }),
    fullName: z
      .string({
        required_error: REQUIRED_FIELD_MESSAGE,
      })
      .min(1, REQUIRED_FIELD_MESSAGE),
    phone: z
      .string({
        required_error: REQUIRED_FIELD_MESSAGE,
      })
      .min(1, REQUIRED_FIELD_MESSAGE)
      .regex(/(\(27\) \d{5}-\d{4}|279\d{8})/g, "Preencha um telefone válido"),
  });
};
