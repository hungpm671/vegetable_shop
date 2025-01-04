"use client";

import { Box, Flex, Grid, Heading } from "@chakra-ui/react";
import "./style.css";
import { useFreshBasketStore } from "@/lib/stores/fresh-basket";
import { useQuery } from "@tanstack/react-query";
import { getVegetableFruit } from "@/_action/vegetableAction";
import { VegetableFruit } from "@/lib/type/vegetable_fruit";
import ProductSuggestionItem from "./ProductSuggestionItem";
import SuggestionSelected from "./SuggestionSelected";

export default function FreshProductSuggestions() {
  const { type } = useFreshBasketStore((state) => state);

  const { data } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => await getVegetableFruit(),
  });

  return (
    <Flex flexDir={"column"} marginBlock={50}>
      <Heading
        as={"h1"}
        fontSize={48}
        textAlign={"center"}
        mb={30}
        fontWeight={700}
      >
        Sản phẩm của chúng tôi
      </Heading>

      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        borderBlockEnd={"1px solid #ccc"}
        mb={30}
      >
        <Heading
          as={"h5"}
          fontSize={16}
          fontWeight={700}
          textTransform={"uppercase"}
        >
          Sản phẩm mới nhất hiện nay
        </Heading>

        <SuggestionSelected />
      </Flex>

      <Grid
        templateColumns="repeat(4, 1fr)"
        templateRows="repeat(2, 1fr)"
        gap={6}
      >
        {data
          ?.filter((filter: VegetableFruit) => filter.type === type)
          .map((value: VegetableFruit, index: number) => (
            <ProductSuggestionItem key={index} value={value} />
          ))}
      </Grid>
    </Flex>
  );
}
