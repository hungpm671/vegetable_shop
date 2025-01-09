"use client";

import React from "react";
import { Flex } from "@chakra-ui/react";
import ProductSearchItem from "./ProductSearchItem";
import ProductSearchInput from "./ProductSearchInput";

export default function ProductSearch() {
  return (
    <Flex flexDir={"column"} position={"relative"}>
      <ProductSearchInput />

      <Flex
        position={"absolute"}
        top={"45px"}
        left={0}
        right={0}
        className="search_result border shadow-lg"
        zIndex={1}
        bgColor={"white"}
        flexDir={"column"}
        paddingInline={"10px"}
      >
        <ProductSearchItem />
      </Flex>
    </Flex>
  );
}
