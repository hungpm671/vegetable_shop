const CalculateSalePrice = (originalPrice: number, discountPercent: number) => {
  return (
    Number(originalPrice) - (Number(originalPrice) * discountPercent) / 100
  );
};

export default CalculateSalePrice;
