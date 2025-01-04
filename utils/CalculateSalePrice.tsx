const CalculateSalePrice = (originalPrice: string, discountPercent: number) => {
  return (
    Number(originalPrice) - (Number(originalPrice) * discountPercent) / 100
  );
};

export default CalculateSalePrice;
