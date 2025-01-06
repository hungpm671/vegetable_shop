"use client";

import { getVegetableFruitItem } from "@/_action/vegetableItemAction";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import CalculateSalePrice from "../../../../utils/CalculateSalePrice";

import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "@/components/ui/breadcrumb";
import { IoMdHome } from "react-icons/io";
import { MdStore } from "react-icons/md";

export default function FreshProductItem() {
  const params = useParams();
  const { slug } = params;
  const { data, isLoading } = useQuery({
    queryKey: ["courses", slug],
    queryFn: async () => {
      if (typeof slug === "string") {
        return await getVegetableFruitItem(slug);
      }
      throw new Error("Invalid slug value");
    },
  });

  if (isLoading) {
    return "Loading...";
  }

  return (
    <Flex className="mx-auto max-w-7xl" mt={"64px"} mb={50} flexDir={"column"}>
      <BreadcrumbRoot mt={"15px"}>
        <BreadcrumbLink href="/">
          <IoMdHome />
          Trang chủ
        </BreadcrumbLink>
        <BreadcrumbLink href="/fresh-products">
          <MdStore />
          Cửa hàng
        </BreadcrumbLink>
        <BreadcrumbCurrentLink color={"black"}>
          {data[0].name}
        </BreadcrumbCurrentLink>
      </BreadcrumbRoot>

      <Grid templateColumns="repeat(2, 1fr)" flex={1} mt={"10px"} gap={5}>
        <GridItem
          className="flex border"
          justifyContent={"center"}
          borderRadius={5}
          padding={"10px"}
        >
          <Image src={data[0]?.image} alt={data?.name} />
        </GridItem>

        <GridItem className="flex" flexDir={"column"} gap={1}>
          <Heading
            as={"h3"}
            textTransform={"capitalize"}
            fontWeight={700}
            fontSize={24}
          >
            {data[0]?.name}
          </Heading>

          <Flex alignItems={"center"} gap={2}>
            <Text fontSize={14} color={"red.500"} fontWeight={700}>
              {Intl.NumberFormat("vi-VN").format(
                CalculateSalePrice(data[0].price_per_kg, data[0].discount)
              )}
              ₫/kg
            </Text>

            {data[0].discount !== 0 && (
              <Text as={"s"} fontSize={10} color={"gray.400"}>
                {Intl.NumberFormat("vi-VN").format(
                  Number(data[0].price_per_kg)
                )}
                ₫/kg
              </Text>
            )}
          </Flex>

          <Text fontSize={14} color={"gray.400"}>
            {data[0]?.state ? "Còn hàng" : "Hết hàng"}
          </Text>

          <Button bgColor={"green.600"} color={"white"}>
            Thêm vào giỏ hàng
          </Button>

          <hr />
          <Text fontSize={14} fontWeight={700}>
            Danh mục:{" "}
            {data[0].type === "fruit"
              ? "Hoa quả"
              : data[0].type === "vegetable"
              ? "Rau củ"
              : "Thực phẩm khô"}
          </Text>

          <Text>{data[0].description}</Text>
        </GridItem>
      </Grid>
    </Flex>
  );
}
