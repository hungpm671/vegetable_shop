export const CalculateWeightPrice = (pricePerKg: number, weight: number) => {
  return (pricePerKg / 1000) * weight;
};
