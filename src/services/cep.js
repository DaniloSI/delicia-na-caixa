export async function getAddressFromCep(rowZipCode) {
  const zipCode = rowZipCode.replace(/\D/g, "");
  const data = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`).then(
    (response) => response.json()
  );

  return {
    street: data.logradouro,
    neighborhood: data.bairro,
    city: data.localidade,
    state: data.uf,
  };
}
