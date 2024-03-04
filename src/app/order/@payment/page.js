"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { HiPhone, HiUser } from "react-icons/hi";

import FormControl from "@/components/FormControl";
import MaskedInput from "@/components/MaskedInput";
import TextInputCustom from "@/components/TextInputCustom";

export default function Payment() {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="prose">
        <h3>Pagamento</h3>
        <p className="leading-6">
          Escolha a forma de pagamento. O pagamento será feito no dia da
          entrega.
        </p>
      </div>
      <FormControl
        labelTop="Selecione a forma de pagamento"
        labelBottom={errors.payment?.message}
        isInvalid={!!errors.payment}
      >
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

      <div className="mt-6 flex flex-col gap-2">
        <div className="prose">
          <h3>Identificação</h3>
          <p className="leading-6">
            Por favor, forneça suas informações de contato, pois é essencial
            para futuros contatos, caso seja necessário.
          </p>
        </div>

        <FormControl
          labelTop="Digite o seu nome"
          labelBottom={errors.fullName?.message}
          isInvalid={!!errors.fullName}
        >
          <TextInputCustom
            id="name"
            name="fullName"
            leftIcon={HiUser}
            onInput={(e) => setValue("fullName", e.target.value)}
            placeholder="Digite aqui o seu nome"
          />
        </FormControl>

        <FormControl
          labelTop="Digite um telefone para contato"
          labelBottom={errors.phone?.message}
          isInvalid={!!errors.phone}
        >
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
