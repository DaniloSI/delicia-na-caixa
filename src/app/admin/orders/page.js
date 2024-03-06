import { redirect } from "next/navigation";
import { compose, descend, path, sortWith, sum } from "ramda";

import { auth } from "@/../auth";
import { databaseOrder } from "@/services/database";
import { getSnacks } from "@/services/store";

import LogoutButton from "../components/LogoutButton";

export default async function Orders() {
  const session = await auth();
  const snacks = await getSnacks();
  const ordersIds = await databaseOrder.getKeys();
  const orders = await databaseOrder.getItems(ordersIds);

  if (!session) {
    redirect("/admin/login");
  }

  const orderedOrders = sortWith([
    descend(compose(Date.parse, path(["value", "dateOrder"]))),
  ])(orders);

  return (
    <div className="mt-4">
      <div className="prose">
        <h3 className="text-center">Últimos 20 pedidos</h3>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Quantidade</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {orderedOrders.map(({ key, value: order }) => (
              <tr key={key}>
                <td>
                  {new Intl.DateTimeFormat("pt-BR", {
                    dateStyle: "short",
                  }).format(new Date(order.dateOrder))}
                </td>
                <td>{sum(Object.values(order.snacks))}</td>
                <td>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(
                    Object.entries(order.snacks)
                      .map(([snack, quantity]) => ({ snack, quantity }))
                      .reduce((acc, { snack, quantity }) => {
                        return (
                          acc +
                          (quantity *
                            order.centPriceStore[
                              snacks.find((s) => s.namePlural === snack).type
                            ]) /
                            100
                        );
                      }, 0),
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="sticky bottom-0 right-0 mt-2 flex flex-col items-stretch bg-white p-4 shadow-[0_0_10px_rgba(0,0,0,.1)]">
        <LogoutButton />
      </div>
    </div>
  );
}
