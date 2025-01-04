import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import ProductsSidebar from "../ProductsSidebar/ProductsSidebar";
import ProductList from "../ProductsList/ProductList";

export default function ProductsMain() {
  return (
    <Grid templateColumns="repeat(4, 1fr)">
      <GridItem colSpan={1}>
        <ProductsSidebar />
      </GridItem>
      <GridItem colSpan={3}>
        <ProductList />
      </GridItem>
    </Grid>
  );
}
