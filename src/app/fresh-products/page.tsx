import { FreshBreadcumb } from "@/components/fresh_basket-products/ProductsBreadcumb/FreshBreadcumb";
import ProductsMain from "@/components/fresh_basket-products/ProductsMain/ProductsMain";
import { Box } from "@chakra-ui/react";
import React from "react";

export default function FreshProducts() {
  return (
    <Box
      className="max-w-7xl"
      mt={"64px"}
      mb={50}
      marginInline={{ base: 5, md: 10, xl: "auto" }}
    >
      <FreshBreadcumb />
      <ProductsMain />
    </Box>
  );
}
