"use-client";

import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaAngleRight } from "react-icons/fa";
import TimeInterval from "./TimeInterval";
import { HiPencil } from "react-icons/hi";
import { padStart } from "@/utils/format";

const timeIntervals = Array.from({ length: 12 }).flatMap((_, index) => {
  const hours = index + 9;
  const first = `${padStart(hours)}:00 - ${padStart(hours)}:30`;
  const second = `${padStart(hours)}:30 - ${padStart(hours + 1)}:00`;

  return [first, second];
});

function SelectTime() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState();
  const { setValue, watch } = useFormContext();

  const time = watch("time") || "";

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="schedule" value="Horário da entrega/retirada" />
      <TextInput
        id="schedule"
        placeholder="Selecione um horário"
        rightIcon={time ? HiPencil : FaAngleRight}
        onClick={() => setShowModal(true)}
        value={time}
        readOnly
      />

      <Modal
        theme={{
          content: {
            inner:
              "relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col max-h-[95dvh]",
          },
        }}
        size="sm"
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        <Modal.Header>Horários disponíveis</Modal.Header>
        <Modal.Body>
          <fieldset>
            <legend className="text-sm mb-4">
              Escolha um intervalo de horário abaixo. <br /> Você receberá o
              pedido dentro do intervalo de tempo selecionado.
            </legend>

            <div className="flex flex-col gap-4">
              {timeIntervals.map((timeInterval) => (
                <TimeInterval
                  key={timeInterval}
                  timeInterval={timeInterval}
                  onChange={setSelectedTime}
                  checked={selectedTime}
                />
              ))}
            </div>
          </fieldset>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="w-1/2"
            color="light"
            onClick={() => setShowModal(false)}
          >
            Fechar
          </Button>
          <Button
            className="w-1/2"
            disabled={!selectedTime}
            onClick={() => {
              setValue("time", selectedTime);
              setShowModal(false);
            }}
            color="primary"
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SelectTime;
