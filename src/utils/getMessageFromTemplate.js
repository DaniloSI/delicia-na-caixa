import { getTotal, getTotalPrice } from "./calc";

const getOrderList = (snacks) => Object.entries(snacks)
  .filter(([_, amount]) => amount > 0)
  .map(([name, amount]) => `- ${amount} ${name}\n`)
  .join('')

const getAddress = ({ street, number, complement, neighborhood, city, state }) =>
  `\nEndereço de *entrega*: ${street}, Nº ${number}${complement ? ',' + complement : ''}, ${neighborhood}, ${city}-${state}\n`

const formatDate = (date) => new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric'
}).format(date)

const isDelivery = (reception) => reception === 'delivery'

const getMessageFromTemplate = ({ snacks, reception, date, time, payment, address }) => `
Pedido:
${getOrderList(snacks)}
Quantidade total: ${getTotal(snacks)}
${isDelivery(reception) ? 'Subtotal' : 'Total'}: ${getTotalPrice(snacks)}
Forma de pagamento: ${payment}
${isDelivery(reception) ? getAddress(address) : ''}
Data e horário da *${isDelivery(reception) ? 'entrega': 'retirada'}*: ${formatDate(date)} às ${time}
`;


export default getMessageFromTemplate;