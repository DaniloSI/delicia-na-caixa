"use client";

import React from "react";

import { useFormContext } from "react-hook-form";

import MaskedInput from "@/components/MaskedInput";
import { HiPhone, HiUser } from "react-icons/hi";
import TextInputCustom from "@/components/TextInputCustom";
import FormControl from "@/components/FormControl";

export default function Payment() {
  const { setValue } = useFormContext();

  return (
    <>
      <div className="prose">
        <h3>Pagamento</h3>
      </div>
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

      <div className="flex flex-col mt-6 gap-2">
        <div className="prose">
          <h3>Identificação</h3>
          <p className="leading-6">Por favor, forneça suas informações de contato, pois é essencial para futuros contatos, caso seja necessário.</p>
        </div>

        <FormControl labelTop="Digite o seu nome">
          <TextInputCustom
            id="name"
            name="fullName"
            leftIcon={HiUser}
            onInput={(e) => setValue("fullName", e.target.value)}
            placeholder="Digite aqui o seu nome"
          />
        </FormControl>

        <FormControl labelTop="Digite um telefone para contato">
          <MaskedInput
            id="phone"
            name="phone"
            inputMode="tel"
            mask="(27) 00000-0000"
            leftIcon={HiPhone}
            onInput={(e) => setValue("phone", e.target.value)}
            placeholder="Digite aqui o seu número"
          />
        </FormControl>
      </div>
    </>
  );
}
