"use client";

import React, { useEffect, useRef } from "react";

import { Controller, useFormContext } from "react-hook-form";

import MaskedInput from "@/components/MaskedInput";
import { SelectTime } from "./components/SelectTime";
import FormControl from "@/components/FormControl";
import TextInputCustom from "@/components/TextInputCustom";
import { HiCalendar, HiPencil } from "react-icons/hi";
import DatePicker from "@/components/DatePicker";
import { FaAngleRight } from "react-icons/fa";

export default function Delivery() {
  const { control, watch, setValue } = useFormContext();
  const modalRef = useRef();

  const reception = watch("reception");
  const cep = watch("address.cep");
  const date = watch("date");

  useEffect(() => {
    if (cep?.length === 9) {
      fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g, "")}/json/`)
        .then((response) => response.json())
        .then((data) => {
          setValue("address.street", data.logradouro);
          setValue("address.neighborhood", data.bairro);
          setValue("address.city", data.localidade);
          setValue("address.state", data.uf);
        });
    }
  }, [cep, setValue]);

  const formattedDate = date
    ? new Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }).format(date)
    : "";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <FormControl labelTop="Data da entrega/retirada">
          <TextInputCustom
            id="deliveryDate"
            name="deliveryDate"
            leftIcon={HiCalendar}
            rightIcon={date ? HiPencil : FaAngleRight}
            readOnly
            value={formattedDate}
            onClick={() => {
              modalRef.current.showModal();
            }}
            placeholder="Selecione uma data"
          />
          <DatePicker
            ref={modalRef}
            onSelect={(date) => {
              setValue("date", date);
            }}
          />
        </FormControl>

        <SelectTime />
      </div>

      <div>
        <h3 className="font-semibold text-gray-900">
          Como deseja receber seu pedido?
        </h3>

        <div className="flex mt-4">
          <div className="flex items-center h-5">
            <input
              id="retire"
              name="reception"
              aria-describedby="retire"
              type="radio"
              value="retire"
              defaultChecked
              className="radio radio-primary mt-2"
              onChange={(e) => setValue("reception", e.target.value)}
            />
          </div>
          <div className="ms-2">
            <label htmlFor="retire" className="font-medium text-gray-900">
              Retirar
              <p className="text-xs font-normal text-gray-500">
                Sem custo com taxa de entrega
                <br />
                Retirar em: Rua Amaralina, Nº 22, Morada de Laranjeiras, Serra,
                ES
              </p>
            </label>
          </div>
        </div>

        <div className="flex mt-4">
          <div className="flex items-center h-5">
            <input
              id="delivery"
              name="reception"
              aria-describedby="delivery"
              type="radio"
              value="delivery"
              className="radio radio-primary mt-2"
              onChange={(e) => setValue("reception", e.target.value)}
            />
          </div>
          <div className="ms-2">
            <label htmlFor="delivery" className="font-medium text-gray-900">
              Entrega
              <p className="text-xs font-normal text-gray-500">
                Receber em sua casa ou no local da festa.
                <br />
                Ao selecionar esta opção, enviaremos o valor da taxa de entrega
                pelo WhatsApp após recebermos o pedido.
                <br />
                Caso mude de ideia e opte pela retirada, basta nos informar pelo
                WhatsApp com pelo menos 1 dia de antecedência.
              </p>
            </label>
          </div>
        </div>
      </div>

      <div className={reception === "retire" ? "hidden" : ""}>
        <h3 className="font-semibold text-gray-900 mb-4">
          Endereço para entrega
        </h3>

        {[
          {
            name: "address.cep",
            label: "CEP",
            placeholder: "Ex.: 29123-000",
          },
          {
            name: "address.state",
            label: "Estado",
            placeholder: "Ex.: Espírito Santo",
            readOnly: true,
          },
          {
            name: "address.city",
            label: "Cidade",
            placeholder: "Ex.: Serra",
            readOnly: true,
          },
          {
            name: "address.neighborhood",
            label: "Bairro",
            placeholder: "Ex.: Morada de Laranjeiras",
            readOnly: true,
          },
          {
            name: "address.street",
            label: "Rua",
            placeholder: "Ex.: Rua Amaralina",
            readOnly: true,
          },
          {
            name: "address.number",
            label: "Número",
            placeholder: "Ex.: 22",
          },
          {
            name: "address.complement",
            label: "Complemento",
            placeholder: "Ex.: Casa 1",
          },
        ].map(({ name, label, placeholder, readOnly = false }) => (
          <Controller
            key={name}
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
              <FormControl labelTop={label}>
                <MaskedInput
                  readOnly={readOnly}
                  disabled={readOnly}
                  placeholder={placeholder}
                  mask={name === "address.cep" ? "00000-000" : ""}
                  inputMode={name === "address.cep" ? "numeric" : "text"}
                  value={value}
                  onChange={onChange}
                />
              </FormControl>
            )}
          />
        ))}
      </div>
    </div>
  );
}
