"use client";

import React, { useContext, useEffect, useRef } from "react";

import { useFormContext } from "react-hook-form";

import { SelectTime } from "./components/SelectTime";
import FormControl from "@/components/FormControl";
import TextInputCustom from "@/components/TextInputCustom";
import { HiCalendar, HiPencil } from "react-icons/hi";
import DatePicker from "@/components/DatePicker";
import { FaAngleRight } from "react-icons/fa";
import { AddressInput } from "./components/AddressInput";
import StepperContext from "@/contexts/stepper";
import { sendGAEvent } from "@next/third-parties/google";
import { getTotalPrice } from "@/utils/calc";
import StoreContext from "@/contexts/store";

export default function Delivery() {
  const { active } = useContext(StepperContext);
  const { activeSnacks } = useContext(StoreContext);
  const { watch, setValue, getValues } = useFormContext();
  const modalRef = useRef();

  useEffect(() => {
    if (active === 1) {
      const snacks = getValues("snacks");

      sendGAEvent({
        event: "begin_checkout",
        ecommerce: {
          currency: "BRL",
          value: getTotalPrice(snacks, activeSnacks),
          items: activeSnacks
            .map((s) => ({
              item_id: s.fieldName,
              item_name: s.name,
              quantity: snacks[s.namePlural] || 0,
              price: s.centPrice / 100,
            }))
            .filter((s) => s.quantity > 0),
        },
      });
    }
  }, [active, activeSnacks, getValues]);

  const reception = watch("reception");
  const date = watch("date");

  const formattedDate = date
    ? new Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }).format(date)
    : "";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-gray-900">
          Quando deseja receber seu pedido?
        </h3>

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
              className="radio radio-primary radio-sm mt-2"
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
              className="radio radio-primary radio-sm mt-2"
              onChange={(e) => setValue("reception", e.target.value)}
            />
          </div>
          <div className="ms-2">
            <label htmlFor="delivery" className="font-medium text-gray-900">
              Entrega
              <p className="text-xs font-normal text-gray-500">
                Receber em sua casa ou no local da festa.
                <br />
                Taxa de entrega: valor a combinar pelo WhatsApp.
              </p>
            </label>
          </div>
        </div>
      </div>

      {
        <div className={reception === "retire" ? "hidden" : ""}>
          <h3 className="font-semibold text-gray-900 mb-4">
            Endereço para entrega
          </h3>

          <AddressInput />
        </div>
      }
    </div>
  );
}
