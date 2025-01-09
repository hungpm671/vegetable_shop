"use client";

import React from "react";
import EmblaCarousel from "./EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { Flex, Heading } from "@chakra-ui/react";
import "./style.css";
import { useQuery } from "@tanstack/react-query";
import { getVegetableFruit } from "@/_action/vegetableAction";
import WaitingLoading from "../../../../utils/WaitingLoading";

export default function ProductSale({ title = "Sản phẩm đang khuyến mãi" }) {
  const { data, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => await getVegetableFruit(),
  });

  const OPTIONS: EmblaOptionsType = { align: "start" };

  if (isLoading) {
    return <WaitingLoading />;
  }

  return (
    <Flex flexDir={"column"} position={"relative"}>
      <Heading
        as={"h5"}
        fontSize={16}
        fontWeight={700}
        textTransform={"uppercase"}
        borderBlockEnd={"1px solid #ccc"}
        mb={30}
      >
        {title}
      </Heading>

      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        position={"relative"}
        mb={30}
      >
        <EmblaCarousel slides={data} options={OPTIONS} />
      </Flex>
    </Flex>
  );
}
