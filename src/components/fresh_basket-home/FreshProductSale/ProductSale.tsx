"use client";

import React from "react";
import EmblaCarousel from "./EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { Heading } from "@chakra-ui/react";
import "./style.css";
import { useQuery } from "@tanstack/react-query";
import { getVegetableFruit } from "@/_action/vegetableAction";
import WaitingLoading from "../../../../utils/WaitingLoading";
import { roboto } from "@/fonts/Roboto";

export default function ProductSale() {
  const { data, isLoading } = useQuery({
    queryKey: ["vegetable"],
    queryFn: async () => await getVegetableFruit(),
  });

  const OPTIONS: EmblaOptionsType = {
    align: "start",
  };

  if (isLoading) {
    return <WaitingLoading />;
  }

  return (
    <>
      <Heading
        as={"h5"}
        className={`${roboto.className} max-w-7xl`}
        fontSize={16}
        fontWeight={700}
        textTransform={"uppercase"}
        borderBlockEnd={"1px solid #ccc"}
        mb={30}
        textAlign={{ base: "center", md: "start" }}
        marginInline={{ base: 5, md: 10, xl: "auto" }}
      >
        Sản phẩm đang khuyến mãi
      </Heading>
      <EmblaCarousel slides={data} options={OPTIONS} />
    </>
  );
}
