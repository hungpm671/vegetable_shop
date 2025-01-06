"use client";

import React, { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { useFreshBasketStore } from "@/lib/stores/fresh-basket";
import { useQuery } from "@tanstack/react-query";
import { getVegetableFruit } from "@/_action/vegetableAction";
import { EmptyState } from "@/components/ui/empty-state";
import { FaFaceDizzy } from "react-icons/fa6";
import ProductPaginatedItems from "./ProductPanigate";

export default function ProductList() {
  const { setVegetableFruits } = useFreshBasketStore((state) => state);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["vegetables"],
    queryFn: async () => await getVegetableFruit(),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setVegetableFruits(data);
    }
  }, [isSuccess, data, setVegetableFruits]);

  if (isLoading) {
    return (
      <EmptyState
        icon={<FaFaceDizzy />}
        title="404 not found"
        description="Chưa có sản phẩm nào được đăng bán"
      />
    );
  }

  return (
    <Flex flexDir={"column"}>
      <ProductPaginatedItems itemsPerPage={9} />
    </Flex>
  );
}
