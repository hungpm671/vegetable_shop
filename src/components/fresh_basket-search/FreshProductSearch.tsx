"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { SearchBreadcumb } from "@/components/fresh_basket-search/SearchBreadcumb";
import { Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getVegetableFruit } from "@/_action/vegetableAction";
import { VegetableFruit } from "@/lib/type/vegetable_fruit";
import { ProductItem } from "../fresh_basket-products/ProductsList/ProductItem";
import SearchProductEmpty from "./SearchProductEmpty";
import "./style.css";
import { useFreshBasketStore } from "@/lib/stores/fresh-basket";

export default function FreshProductSearch() {
  const { filterConditions, setVegetableFruits } = useFreshBasketStore(
    (state) => state
  );

  const searchParams = useSearchParams();
  const search = searchParams.get("search_query");

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["vegetables"],
    queryFn: async () => await getVegetableFruit(),
  });

  useEffect(() => {
    if (isSuccess && data) {
      const filteredData = data?.filter((item: VegetableFruit) =>
        item.name.toLowerCase().includes(search?.toLowerCase()!)
      );
      setVegetableFruits(filteredData);
    }
  }, [isSuccess, data, setVegetableFruits]);

  if (isLoading) return "Loading...";

  return (
    <>
      <SearchBreadcumb params={search} amount={filterConditions?.length} />

      {filterConditions?.length ? (
        <Grid templateColumns={"repeat(3, 1fr)"} gap={5}>
          {filterConditions?.map((value: VegetableFruit, index: number) => (
            <ProductItem key={index} value={value} />
          ))}
        </Grid>
      ) : (
        <SearchProductEmpty />
      )}
    </>
  );
}
