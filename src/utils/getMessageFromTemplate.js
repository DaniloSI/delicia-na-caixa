const getMessageFromTemplate = ({ snacks }) => `
[Pedido]
${Object.entries(snacks).map(([name, amount]) => `\n- ${name}: ${amount}`).join('')}

Quantidade total: ${Object.entries(snacks).map(([_, amount]) => amount).reduce((p, n) => p + Math.abs(parseInt(n)), 0)}
`;


export default getMessageFromTemplate;