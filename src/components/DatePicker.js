import { ptBR } from "date-fns/locale";
import { forwardRef, useState } from "react";
import { DayPicker } from "react-day-picker";

import { getDate } from "@/utils/date";

import Divider from "./Divider";

function DatePicker({ onSelect, footer }, ref) {
  const [date, setDate] = useState();

  const handleCloseModal = () => {
    ref.current.close();
  };

  const handleConfirm = () => {
    onSelect(date);
    handleCloseModal();
  };

  return (
    <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <div className="prose">
          <p className="font-normal">
            Escolha uma data para receber o seu pedido.
          </p>
        </div>

        <Divider />

        <div>
          <DayPicker
            mode="single"
            selected={date}
            onSelect={setDate}
            showOutsideDays
            locale={ptBR}
            footer={footer}
            disabled={{ before: getDate(1), after: getDate(30 * 6) }}
          />
        </div>

        <Divider />

        <div className="modal-action mr-4 flex gap-2">
          <button type="button" className="btn grow" onClick={handleCloseModal}>
            Fechar
          </button>
          <button
            type="button"
            className="btn grow btn-primary"
            onClick={handleConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default forwardRef(DatePicker);
