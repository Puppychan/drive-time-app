export const calculateTaxiFare = (distance: number): number => {
  // Opening price
  const baseFare = 5000 / 0.3

  const feeFromKm2ToKm2 = 16900

  const feeFromKm3ToKm10 = 12600

  const feeFromKm11ToKm26 = 13900

  const feeFromKm26 = 11600

  // Total Fare
  let totalFare = baseFare
  if (distance > 0.3) {
    totalFare += feeFromKm2ToKm2
  }
  if (distance > 2) {
    totalFare += (distance - 2) * feeFromKm3ToKm10
  }
  if (distance > 10) {
    totalFare += (Math.min(distance, 26) - 10) * feeFromKm11ToKm26
  }
  if (distance > 26) {
    totalFare += (distance - 26) * feeFromKm26
  }

  const exchangeRate = 1 / 23000
  return totalFare * exchangeRate
}

const distance = 5
const fareInUSD = calculateTaxiFare(distance)
console.log(`The taxi fare for ${distance} km is ${fareInUSD.toFixed(2)} USD`)
