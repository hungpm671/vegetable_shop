import { Flex, Heading, Input } from "@chakra-ui/react";
import React from "react";
import { InputGroup } from "@/components/ui/input-group";
import { LuSearch } from "react-icons/lu";
import ProductsFilter from "./ProductsFilter";

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

      <InputGroup
        flex="1"
        startElement={<LuSearch />}
        border={"1px solid #ccc"}
        borderRadius={"4px"}
      >
        <Input placeholder="Search..." />
      </InputGroup>

      {/* List products sidebar */}
      <ProductsFilter />
    </Flex>
  );
}
