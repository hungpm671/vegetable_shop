import React from "react";
import CalculateSalePrice from "./CalculateSalePrice";
import { Box } from "@chakra-ui/react";
import { useUsersStore } from "@/lib/stores/users";

export default function TotalCart() {
  const { cartUser } = useUsersStore((state) => state);
  const total = cartUser.reduce(
    (acc, curr) =>
      acc + CalculateSalePrice(curr.price, curr.discount) * curr.quantity,
    0
  );

  return (
    <Box>Tổng tiền: {Intl.NumberFormat("vi-VN").format(Number(total))}₫</Box>
  );
}
