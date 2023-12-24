const getMessageFromTemplate = ({ snacks }) => `
[Pedido]
${Object.entries(snacks).map(([name, amount]) => `\n- ${name}: ${amount}`).join('')}
`;


export default getMessageFromTemplate;