import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import ProductsSidebar from "../ProductsSidebar/ProductsSidebar";
import ProductList from "../ProductsList/ProductList";

export default function ProductsMain() {
  return (
    <Grid templateColumns={{ base: "1fr", lg: "repeat(4, 1fr)" }}>
      <GridItem colSpan={1} display={{ base: "none", lg: "flex" }}>
        <ProductsSidebar />
      </GridItem>
      <GridItem colSpan={{ base: 3 }}>
        <ProductList />
      </GridItem>
    </Grid>
  );
}
