"use-client";

import React, { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaAngleRight } from "react-icons/fa";
import TimeInterval from "./TimeInterval";
import { HiPencil } from "react-icons/hi";
import { padStart } from "@/utils/format";
import Divider from "@/components/Divider";
import FormControl from "@/components/FormControl";
import TextInputCustom from "@/components/TextInputCustom";

const timeIntervals = Array.from({ length: 12 }).flatMap((_, index) => {
  const hours = index + 9;
  const first = `${padStart(hours)}:00 - ${padStart(hours)}:30`;
  const second = `${padStart(hours)}:30 - ${padStart(hours + 1)}:00`;

  return [first, second];
});

function SelectTime() {
  const [selectedTime, setSelectedTime] = useState();
  const { setValue, watch } = useFormContext();
  const modalRef = useRef()

  const time = watch("time") || "";

  const handleCloseModal = () => {
    modalRef.current.close()
  }

  const handleOpenModal = () => {
    modalRef.current.showModal()
  }

  const handleConfirm = () => {
    setValue("time", selectedTime);
    handleCloseModal();
  }

  return (
    <FormControl labelTop="Horário da entrega/retirada">
      <TextInputCustom
        id="schedule"
        placeholder="Selecione um horário"
        rightIcon={time ? HiPencil : FaAngleRight}
        onClick={handleOpenModal}
        value={time}
        readOnly
      />

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Horários disponíveis</h3>
          <fieldset>
            <legend className="text-sm mb-4 mr-4">
              Escolha um intervalo de horário abaixo. <br /> Você receberá ou
              deverá retirar o pedido dentro do intervalo de tempo selecionado.
            </legend>

            <div className="flex flex-col max-h-[50dvh] overflow-scroll pr-4">
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
            <button type="button" className="btn grow" onClick={handleCloseModal}>Fechar</button>
            <button type="button" className="btn grow btn-primary" onClick={handleConfirm}>Confirmar</button>
          </div>
        </div>
      </dialog>
    </FormControl>
  );
}

export default SelectTime;
