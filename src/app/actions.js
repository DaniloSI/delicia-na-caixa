"use server";

import { databaseOrder } from "@/services/database";
import { getCentPrice } from "@/services/store";
import { v4 as uuidv4 } from "uuid";
import { Resend } from 'resend';

const resend = new Resend('re_eAWNjTpL_2fi1vaLYKqyyoNpFrsV7DBzy');

export async function createOrder(order) {
  const centPriceOriginal = await getCentPrice();
  const { centPriceStore } = order;

  const orderId = uuidv4();
  const newOrder = { ...order, dateOrder: new Date(), centPriceOriginal };

  await databaseOrder.setItem(orderId, newOrder);

  if (
    centPriceOriginal.partySnacks !== centPriceStore.partySnacks ||
    centPriceOriginal.miniChurros !== centPriceStore.miniChurros
  ) {
    (async function () {
      const { data, error } = await resend.emails.send({
        from: 'Danilo de Oliveira <danilo@danilodeoliveira.dev>',
        to: ['danilodeoliveira94@gmail.com'],
        subject: 'Preço incompatível',
        html: `<p>O preço do pedido não condiz com o preço da loja. <br />Id do pedido: <strong><code>${orderId}</code></strong></p>`,
      });
    
      if (error) {
        return console.error({ error });
      }
    
      console.log({ data });
    })();

    console.log({
      status: "error",
      message: `Preço incompatível do pedido ${orderId}`,
    });
  }
}
