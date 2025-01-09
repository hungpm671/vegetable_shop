import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

import ProductsFilter from "./ProductsFilter";
import ProductSearch from "./product_search/ProductSearch";
import "./style.css";

export default function ProductsSidebar() {
  return (
    <Flex
      flexDir={"column"}
      gap={5}
      borderInlineEnd={"1px solid #ccc"}
      paddingInlineEnd={50}
      marginInlineEnd={"10px"}
    >
      <Heading
        textTransform={"uppercase"}
        color={"green.600"}
        fontWeight={700}
        fontSize={30}
      >
        Tìm kiếm theo
      </Heading>

      <ProductSearch />

      {/* List products sidebar */}
      <ProductsFilter />
    </Flex>
  );
}
