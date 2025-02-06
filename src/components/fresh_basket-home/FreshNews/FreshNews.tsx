"use client";

import React from "react";
import EmblaCarousel from "./EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import "./embla.css";
import { Heading } from "@chakra-ui/react";
import { useFreshBasketStore } from "@/lib/stores/fresh-basket";
import { macondo } from "@/fonts/Macondo";

export default function FreshNews() {
  const { fresh_news } = useFreshBasketStore((state) => state);

  const OPTIONS: EmblaOptionsType = {};
  const SLIDES = fresh_news;
  return (
    <>
      <Heading
        as={"h1"}
        className={macondo.className}
        fontSize={{ base: "35px", md: "40px", lg: "45px" }}
        textAlign={"center"}
        fontWeight={700}
        marginBlock={"60px 30px"}
      >
        Tin Tức
      </Heading>

      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </>
    // <Flex
    //   className="mx-auto max-w-7xl"
    //   marginBlock={50}
    //   flexDir={"column"}
    //   id="news"
    // >

    // </Flex>
  );
}
