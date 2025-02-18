import React from "react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getVegetableFruitItem } from "@/_action/vegetableItemAction";
import { SkeletonCircle } from "@/components/ui/skeleton";
import { Cart } from "@/lib/type/users";
import CalculateSalePrice from "../../../../../utils/CalculateSalePrice";

export default function OrderItem({ item }: { item: Cart }) {
  const { data, isLoading } = useQuery({
    queryKey: ["vegetable", item.product_id],
    queryFn: async () => await getVegetableFruitItem(item.product_id),
    enabled: !!item.product_id,
  });

  if (isLoading)
    return (
      <HStack gap="5">
        <SkeletonCircle size="12" />
        <Stack flex="1">
          <Skeleton height="5" />
          <Skeleton height="5" width="80%" />
        </Stack>
      </HStack>
    );

  const vegetable = data[0];

  return (
    <Flex gap={3} paddingBlock={"5px"}>
      <Image src={vegetable.image} alt={vegetable.name} w={"60px"} h={"60px"} />

      <Box w={"full"}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Heading
            as={"h5"}
            fontSize={14}
            fontWeight={500}
            textTransform={"capitalize"}
          >
            {vegetable.name}
          </Heading>

          <Text color={"gray.400"} fontSize={12}>
            {`x${item.quantity}`}
          </Text>
        </Flex>

        <Flex justifyContent={"space-between"}>
          <Text color={"gray.400"}>
            {item.weight >= 1000
              ? `${item.weight / 1000}kg`
              : `${item.weight}g`}
          </Text>

          <Flex alignItems={"center"} gap={2}>
            <Text fontSize={12} fontWeight={700} color={"red.500"}>
              {Intl.NumberFormat("vi-VN").format(
                CalculateSalePrice(item.price, item.discount) *
                  Number(item.quantity)
              )}
              ₫
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
