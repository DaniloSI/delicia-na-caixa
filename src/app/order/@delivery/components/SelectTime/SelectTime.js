"use-client";

import React, { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaAngleRight } from "react-icons/fa";
import { HiClock, HiPencil } from "react-icons/hi";

import Divider from "@/components/Divider";
import FormControl from "@/components/FormControl";
import TextInputCustom from "@/components/TextInputCustom";
import { padStart } from "@/utils/format";

import TimeInterval from "./TimeInterval";

const timeIntervals = Array.from({ length: 12 }).flatMap((_, index) => {
  const hours = index + 9;
  const first = `${padStart(hours)}:00 - ${padStart(hours)}:30`;
  const second = `${padStart(hours)}:30 - ${padStart(hours + 1)}:00`;

  return [first, second];
});

function SelectTime() {
  const [selectedTime, setSelectedTime] = useState();
  const { setValue, watch } = useFormContext();
  const modalRef = useRef();

  const time = watch("time") || "";

  const handleCloseModal = () => {
    modalRef.current.close();
  };

  const handleOpenModal = () => {
    modalRef.current.showModal();
  };

  const handleConfirm = () => {
    setValue("time", selectedTime);
    handleCloseModal();
  };

  return (
    <FormControl labelTop="Horário da entrega/retirada">
      <TextInputCustom
        id="schedule"
        placeholder="Selecione um horário"
        leftIcon={HiClock}
        rightIcon={time ? HiPencil : FaAngleRight}
        onClick={handleOpenModal}
        value={time}
        readOnly
      />

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Horários disponíveis</h3>
          <fieldset>
            <legend className="mb-4 mr-4 text-sm">
              Escolha um intervalo de horário abaixo. <br /> Você receberá ou
              deverá retirar o pedido dentro do intervalo de tempo selecionado.
            </legend>

            <div className="flex max-h-[50dvh] flex-col overflow-scroll pr-4">
              <Divider />
              {timeIntervals.map((timeInterval) => (
                <React.Fragment key={timeInterval}>
                  <TimeInterval
                    timeInterval={timeInterval}
                    onChange={setSelectedTime}
                    checked={selectedTime}
                  />
                  <Divider />
                </React.Fragment>
              ))}
            </div>
          </fieldset>
          <div className="modal-action mr-4 flex gap-2">
            <button
              type="button"
              className="btn grow"
              onClick={handleCloseModal}
            >
              Fechar
            </button>
            <button
              type="button"
              className="btn btn-primary grow"
              onClick={handleConfirm}
            >
              Confirmar
            </button>
          </div>
        </div>
      </dialog>
    </FormControl>
  );
}

export default SelectTime;
