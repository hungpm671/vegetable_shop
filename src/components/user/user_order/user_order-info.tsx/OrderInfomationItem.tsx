import { getVegetableFruitItem } from "@/_action/vegetableItemAction";
import { SkeletonText } from "@/components/ui/skeleton";
import { Cart } from "@/lib/type/users";
import { Table } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CalculateSalePrice from "../../../../../utils/CalculateSalePrice";

export default function OrderInfomationItem({ value }: { value: Cart }) {
  const { data, isLoading } = useQuery({
    queryKey: ["vegetable", value.product_id],
    queryFn: async () => await getVegetableFruitItem(value.product_id),
    enabled: !!value.product_id,
  });

  if (isLoading) {
    return <SkeletonText noOfLines={3} gap="4" />;
  }

  return (
    <Table.Row color={"white"}>
      <Table.Cell textTransform={"capitalize"}>{data[0]?.name}</Table.Cell>
      <Table.Cell textAlign="center">
        {value.weight >= 1000 ? `${value.weight / 1000}kg` : `${value.weight}g`}
      </Table.Cell>
      <Table.Cell textAlign="center">{value.quantity}</Table.Cell>
      <Table.Cell textAlign="end">
        {Intl.NumberFormat("vi-VN").format(
          CalculateSalePrice(value.price, value.discount) *
            Number(value.quantity)
        )}
        ₫
      </Table.Cell>
    </Table.Row>
  );
}
