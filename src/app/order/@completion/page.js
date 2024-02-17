"use client";

import React, { useContext, useMemo } from "react";

import { useFormContext } from "react-hook-form";
import getOrderSummary from "@/utils/getOrderSummary";

import StoreContext from "@/contexts/store";
import MaskedInput from "@/components/MaskedInput";
import { HiPhone, HiUser } from "react-icons/hi";
import TextInputCustom from "@/components/TextInputCustom";
import FormControl from "@/components/FormControl";

export default function Completion() {
  const { activeSnacks } = useContext(StoreContext);
  const { watch, setValue } = useFormContext();

  const all = watch();

  const summary = useMemo(
    () => getOrderSummary(all, activeSnacks).trim().replaceAll("*", ""),
    [all, activeSnacks]
  );

  return (
    <>
      <FormControl labelTop="Selecione a forma de pagamento">
        <select
          id="payment"
          name="payment"
          className="select select-bordered"
          onChange={(e) => setValue("payment", e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            -- selecione uma forma de pagamento --
          </option>
          <option>Dinheiro</option>
          <option>PIX</option>
          <option>PicPay</option>
        </select>
      </FormControl>

      <FormControl labelTop="Digite o seu nome">
        <TextInputCustom
          id="name"
          name="fullName"
          leftIcon={HiUser}
          onInput={(e) => setValue("fullName", e.target.value)}
        />
      </FormControl>

      <FormControl labelTop="Digite um telefone para contato">
        <MaskedInput
          id="phone"
          name="phone"
          inputMode="tel"
          mask="(27) 00000-0000"
          lazy={false}
          leftIcon={HiPhone}
          onInput={(e) => setValue("phone", e.target.value)}
        />
      </FormControl>

      <div className="flex flex-col gap-1 mb-4">
        <h6 className="text-lg font-bold">Enviar o pedido</h6>
        <p className="text-base">
          Confira abaixo se o pedido está correto e, em seguida, clique no botão
          &quot;Enviar pedido&quot; abaixo para enviar o pedido para a loja por
          meio do WhatsApp.
        </p>
      </div>

      <div
        tabIndex={0}
        className="collapse collapse-arrow collapse-open border border-base-300 bg-base-200"
      >
        <div className="collapse-title text-xl font-medium">
          Resumo do pedido
        </div>
        <div className="collapse-content bg-white">
          <p className="whitespace-pre-wrap pt-4">{summary}</p>
        </div>
      </div>
    </>
  );
}
