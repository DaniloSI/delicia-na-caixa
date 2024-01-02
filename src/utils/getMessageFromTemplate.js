import { getTotal } from "./calc";

const getOrderList = (snacks) => Object.entries(snacks).map(([name, amount]) => `- ${name}: ${amount}\n`).join('')

const getAddress = ({ street, number, complement, neighborhood, city, state }) =>
  `\nEndereço de \*entrega\*: ${street}, Nº ${number}${complement ? ',' + complement : ''}, ${neighborhood}, ${city}-${state}\n`

const formatDate = (date) => new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric'
}).format(date)

const getMessageFromTemplate = ({ snacks, reception, date, time, ...rest }) => `
Pedido:
${getOrderList(snacks)}
Quantidade total: ${getTotal(snacks)}
${reception === 'delivery' ? getAddress(rest) : ''}
Data e horário da \*${reception === 'retire' ? 'retirada' : 'entrega'}\*: ${formatDate(date)} às ${time}
`;


export default getMessageFromTemplate;