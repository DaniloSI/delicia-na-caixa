"use client";

import React, { useEffect, useMemo } from "react";

import { Controller, useFormContext } from "react-hook-form";

import { Datepicker, Label } from "flowbite-react";
import MaskedInput from "@/components/MaskedInput";
import TextInput from "@/components/TextInput";

import { HiOutlineClock } from "react-icons/hi";

import { datePickerTheme } from "@/theme";
import { getTomorrowDate } from "@/utils/date";

export default function Delivery() {
  const { control, watch, setValue } = useFormContext();

  const reception = watch("reception");
  const cep = watch("address.cep");

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

  const tomorrow = useMemo(getTomorrowDate, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="deliveryDate"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Data da entrega/retirada
          </label>
          <Datepicker
            language="pt-BR"
            title="Data da entrega/retirada"
            showTodayButton={false}
            labelClearButton="Limpar"
            minDate={tomorrow}
            theme={datePickerTheme}
            onSelectedDateChanged={(date) => setValue("date", date)}
          />
        </div>

        <div className="text-start">
          <Label htmlFor="time" value="Horário da entrega/retirada" />
          <TextInput
            id="time"
            type="time"
            placeholder="Ex.: 15:30"
            icon={HiOutlineClock}
            onChange={(e) => setValue("time", e.target.value)}
          />
        </div>
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
              aria-describedby="retire-text"
              type="radio"
              value="retire"
              defaultChecked
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              onChange={(e) => setValue("reception", e.target.value)}
            />
          </div>
          <div className="ms-2 text-sm">
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
              aria-describedby="delivery-text"
              type="radio"
              value="delivery"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              onChange={(e) => setValue("reception", e.target.value)}
            />
          </div>
          <div className="ms-2 text-sm">
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

        <div className="flex flex-col gap-4">
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
                <div className="flex flex-col gap-2">
                  <Label htmlFor={name} value={label} />
                  <MaskedInput
                    readOnly={readOnly}
                    disabled={readOnly}
                    placeholder={placeholder}
                    mask={name === "address.cep" ? "00000-000" : ""}
                    inputMode={name === "address.cep" ? "numeric" : "text"}
                    value={value}
                    onChange={onChange}
                  />
                </div>
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
