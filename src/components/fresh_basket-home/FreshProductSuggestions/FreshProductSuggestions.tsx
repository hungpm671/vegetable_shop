"use client";

import { Flex, Grid, Heading } from "@chakra-ui/react";
import "./style.css";
import { useFreshBasketStore } from "@/lib/stores/fresh-basket";
import { useQuery } from "@tanstack/react-query";
import { getVegetableFruit } from "@/_action/vegetableAction";
import { VegetableFruit } from "@/lib/type/vegetable_fruit";
import ProductSuggestionItem from "./ProductSuggestionItem";
import SuggestionSelected from "./SuggestionSelected";
import WaitingLoading from "../../../../utils/WaitingLoading";

export default function FreshProductSuggestions() {
  const { type } = useFreshBasketStore((state) => state);

  const { data, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => await getVegetableFruit(),
  });

  if (isLoading) {
    return <WaitingLoading />;
  }

  return (
    <Flex
      className="max-w-7xl"
      flexDir={"column"}
      marginBlock={50}
      marginInline={{ base: 5, md: 10, xl: "auto" }}
    >
      <Heading
        as={"h1"}
        fontSize={{ base: "35px", md: "40px", lg: "45px" }}
        textAlign={"center"}
        mb={30}
        fontWeight={700}
        lineHeight={1.2}
      >
        Sản phẩm của chúng tôi
      </Heading>

      <Flex
        flexDir={{ base: "column", md: "row" }}
        alignItems={"center"}
        justifyContent={"space-between"}
        borderBlockEnd={"1px solid #ccc"}
        mb={30}
      >
        <Heading
          as={"h5"}
          fontSize={{ base: "14px", lg: "16px" }}
          fontWeight={700}
          textTransform={"uppercase"}
        >
          Sản phẩm mới nhất hiện nay
        </Heading>

        <SuggestionSelected />
      </Flex>

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
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
