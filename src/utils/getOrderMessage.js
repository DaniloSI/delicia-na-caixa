import Handlebars from "handlebars";

import templateOrder from "!!raw-loader!@/templates/template-order.hbs";
import partialAddress from "!!raw-loader!@/templates/partials/address.hbs";
import partialDeliveryOrPickup from "!!raw-loader!@/templates/partials/delivery-or-pickup.hbs";
import { getTotal, getTotalPrice } from "./calc";

const helpers = [
  ["totalQuantity", getTotal],
  ["totalPrice", getTotalPrice],
  [
    "fullDate",
    (d) =>
      new Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(d),
  ],
];

helpers.forEach(([name, fn]) => Handlebars.registerHelper(name, fn));
Handlebars.registerPartial("partialAddress", partialAddress);
Handlebars.registerPartial("partialDeliveryOrPickup", partialDeliveryOrPickup);

const formatDateOrder = (date) =>
  new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

const getOrderMessage = (order, activeSnacks) => {
  const template = Handlebars.compile(templateOrder);
  const dateOrder = formatDateOrder(new Date());

  const data = Handlebars.Utils.extend(order, {
    activeSnacks,
    dateOrder,
    isDelivery: order.reception === "delivery",
  });

  return template(data);
};

export default getOrderMessage;
