"use client";

import React, { useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";

import StoreContext from "@/contexts/store";
import getOrderSummary from "@/utils/getOrderSummary";

export default function Confirmation() {
  const { activeSnacks } = useContext(StoreContext);
  const { watch } = useFormContext();

  const all = watch();

  const summary = useMemo(
    () => getOrderSummary(all, activeSnacks).trim().replaceAll("*", ""),
    [all, activeSnacks],
  );

  return (
    <>
      <div className="prose mb-6 flex flex-col">
        <h3 className="mb-2">Enviar o pedido</h3>
        <p className="leading-6">
          Confira abaixo se o pedido está correto e, em seguida, clique no botão
          &quot;Enviar pedido&quot; abaixo para enviar o pedido para a loja por
          meio do WhatsApp.
        </p>
      </div>

      <div className="collapse collapse-open collapse-arrow border border-base-300 bg-base-200">
        <div className="collapse-title text-xl font-medium">
          Resumo do pedido
        </div>
        <div className="collapse-content bg-white">
          <p className="whitespace-pre-wrap pt-4">{summary}</p>
        </div>
      </div>
    </>
  );
}
