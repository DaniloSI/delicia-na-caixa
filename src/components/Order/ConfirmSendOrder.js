import { forwardRef, useState } from "react";
import { FiSend } from "react-icons/fi";

function ConfirmSendOrder(_, ref) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  return (
    <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Por favor, leia com atenção!</h3>
        <p className="py-4">
          Depois de clicar em &apos;Enviar pedido&apos;, o WhatsApp vai abrir
          com a mensagem do seu pedido. Mas{" "}
          <span className="underline">
            para o estabelecimento realmente receber o seu pedido, você precisa
            apertar o botão de &apos;Enviar mensagem&apos; no WhatsApp
          </span>
          . Se não fizer isso, o pedido não chegará para o estabelecimento.
        </p>

        <div className="form-control">
          <label className="label cursor-pointer flex-row-reverse justify-end gap-4">
            <span className="label-text text-base">
              Confirmo que li, entendi e desejo prosseguir.
            </span>
            <input
              type="checkbox"
              value={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
              className="checkbox-primary checkbox checkbox-sm focus-visible:outline-none"
            />
          </label>
        </div>
        <div className="modal-action flex justify-evenly gap-2">
          <button
            type="button"
            className="btn btn-ghost grow"
            onClick={() => ref.current.close()}
          >
            Fechar
          </button>

          <button className="btn btn-primary grow" disabled={!isConfirmed}>
            <FiSend className="mr-2 size-5" />
            Enviar pedido
          </button>
        </div>
      </div>
      <div className="modal-backdrop">
        <button type="button" onClick={() => ref.current.close()}>
          close
        </button>
      </div>
    </dialog>
  );
}

export default forwardRef(ConfirmSendOrder);
