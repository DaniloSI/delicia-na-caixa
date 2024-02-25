import { forwardRef, useState } from "react";
import { FiSend } from "react-icons/fi";

function ConfirmSendOrder(_, ref) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  return (
    <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Por favor, leia com atenção!</h3>
        <p className="py-4">
          Após clicar em &quot;Enviar pedido&quot;, o seu aplicativo de WhatsApp
          irá abrir na conversa com o estabelecimento e com a mensagem escrita
          contendo os detalhes do pedido. No entanto,{" "}
          <span className="text-primary">
            para que o pedido chegue de fato para o estabelecimento, é preciso
            que clique no botão de enviar mensagem do WhatsApp
          </span>
          . Caso não clique no botão de enviar mensagem, no WhatsApp, o
          estabelecimento não receberá o pedido.
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
              className="checkbox checkbox-primary"
              autoFocus={false}
            />
          </label>
        </div>
        <div className="modal-action flex justify justify-evenly gap-2">
          <button
            type="button"
            className="btn btn-ghost grow"
            onClick={() => ref.current.close()}
          >
            Fechar
          </button>

          <button className="btn btn-primary grow" disabled={!isConfirmed}>
            <FiSend className="mr-2 h-5 w-5" />
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
