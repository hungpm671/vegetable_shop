import React from "react";
import CalculateSalePrice from "./CalculateSalePrice";
import { Box } from "@chakra-ui/react";
import { Cart, Users } from "@/lib/type/users";

export default function TotalCart({ value }: { value: Cart[] }) {
  const total = value.reduce(
    (acc, curr) =>
      acc +
      CalculateSalePrice(curr.price.toString(), curr.discount) * curr.quantity,
    0
  );

  return (
    <Box>Tổng tiền: {Intl.NumberFormat("vi-VN").format(Number(total))}₫</Box>
  );
}
