"use client";

import React from "react";
import EmblaCarousel from "./EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { Flex, Heading } from "@chakra-ui/react";
import "./style.css";
import { useQuery } from "@tanstack/react-query";
import { getVegetableFruit } from "@/_action/vegetableAction";

export default function ProductSale() {
  const { data, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => await getVegetableFruit(),
  });

  const OPTIONS: EmblaOptionsType = { align: "start" };

  if (isLoading) {
    return "Loading...";
  }

  return (
    <Flex flexDir={"column"} position={"relative"}>
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
          Sản phẩm đang khuyến mãi
        </Heading>
      </Flex>

      <EmblaCarousel slides={data} options={OPTIONS} />
    </Flex>
  );
}
