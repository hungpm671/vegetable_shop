"use client";

import React from "react";
import EmblaCarousel from "./EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import "./embla.css";
import { Flex, Heading } from "@chakra-ui/react";
import { useFreshBasketStore } from "@/lib/stores/fresh-basket";

export default function FreshNews() {
  const { fresh_news } = useFreshBasketStore((state) => state);

  const OPTIONS: EmblaOptionsType = {};
  const SLIDES = fresh_news;
  return (
    <Flex
      className="mx-auto max-w-7xl"
      marginBlock={50}
      flexDir={"column"}
      id="news"
    >
      <Heading
        as={"h1"}
        fontSize={48}
        textAlign={"center"}
        fontWeight={700}
        mb={30}
      >
        Tin Tức
      </Heading>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </Flex>
  );
}
