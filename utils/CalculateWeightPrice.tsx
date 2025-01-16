export const CalculateWeightPrice = (pricePerKg: number, weight: number) => {
  if (weight <= 1) {
    return pricePerKg;
  }

  return (pricePerKg / 1000) * weight;
};
