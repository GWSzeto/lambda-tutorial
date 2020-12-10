
const parseAddress = ({ unit, streetNumber, streetName, city, province, postalCode, poBox, country }) => {
  let address = ''
  if (streetNumber) address = streetNumber
  if (streetName) address = `${address} ${streetName}`
  if (unit) address = `${address} - ${unit}`
  if (city) address = `${address}, ${city}`
  if (province) address = `${address}, ${province}`
  if (country) address = `${address}, ${country}`
  if (postalCode) address = `${address}, ${postalCode}`
  if (poBox) address = `PO Box: ${poBox} - ${address}, ${postalCode}`

  return address
};

module.exports = parseAddress;
