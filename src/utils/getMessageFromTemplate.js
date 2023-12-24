import { getTotal } from "./calc";

const getMessageFromTemplate = ({ snacks }) => `
[Pedido]
${Object.entries(snacks).map(([name, amount]) => `\n- ${name}: ${amount}`).join('')}

Quantidade total: ${getTotal(snacks)}
`;


export default getMessageFromTemplate;