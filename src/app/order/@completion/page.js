"use client";

import React, { useContext, useMemo } from "react";

import { useFormContext } from "react-hook-form";
import getOrderSummary from "@/utils/getOrderSummary";

import { Accordion, Label, Select } from "flowbite-react";

import StoreContext from "@/contexts/store";
import TextInput from "@/components/TextInput";
import MaskedInput from "@/components/MaskedInput";
import { HiPhone, HiUser } from "react-icons/hi";

export default function Completion() {
  const { activeSnacks } = useContext(StoreContext);
  const { watch, setValue } = useFormContext();

  const all = watch();

  const summary = useMemo(
    () => getOrderSummary(all, activeSnacks).trim().replaceAll("*", ""),
    [all, activeSnacks]
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="payment" value="Selecione a forma de pagamento" />
        <Select
          id="payment"
          onChange={(e) => setValue("payment", e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            -- selecione uma forma de pagamento --
          </option>
          <option>Dinheiro</option>
          <option>PIX</option>
          <option>PicPay</option>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="name" value="Digite o seu nome" />
        <TextInput
          id="name"
          name="fullName"
          icon={HiUser}
          onInput={(e) => setValue("fullName", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="phone" value="Digite um telefone para contato" />
        <MaskedInput
          id="phone"
          name="phone"
          inputMode="tel"
          mask="(27) 00000-0000"
          lazy={false}
          icon={HiPhone}
          onInput={(e) => setValue("phone", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <h6 className="text-lg font-bold">Enviar o pedido</h6>
        <p className="text-base">
          Confira abaixo se o pedido está correto e, em seguida, clique no botão
          &quot;Enviar pedido&quot; abaixo para enviar o pedido para a loja por
          meio do WhatsApp.
        </p>
      </div>

      <Accordion>
        <Accordion.Panel>
          <Accordion.Title>Resumo do pedido</Accordion.Title>
          <Accordion.Content>
            <p className="whitespace-pre-wrap">{summary}</p>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
}
