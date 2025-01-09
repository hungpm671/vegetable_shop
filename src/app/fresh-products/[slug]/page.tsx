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
import { EmptyState } from "@/components/ui/empty-state";
import { FaHeart, FaSpinner } from "react-icons/fa6";
import ProductSale from "@/components/fresh_basket/FreshProductSale/ProductSale";
import { Textarea } from "@chakra-ui/react";

import { Card, HStack, Stack } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";

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

  if (isLoading)
    return (
      <Flex className="mx-auto max-w-7xl" mt={"64px"} mb={50}>
        <EmptyState
          icon={<FaSpinner className="animate-spin text-blue-500 text-4xl" />}
          title="Đang tìm kiếm kết quả..."
          description="Chúng tôi đang xử lý thông tin và sẽ mang đến câu trả lời cho bạn ngay khi có thể. Vui lòng đợi trong giây lát!"
        />
      </Flex>
    );

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
        <BreadcrumbCurrentLink
          color={"black"}
          textTransform={"capitalize"}
          fontWeight={600}
        >
          {data[0]?.name}
        </BreadcrumbCurrentLink>
      </BreadcrumbRoot>

      <Grid
        templateColumns="repeat(2, 1fr)"
        flex={1}
        marginBlock={"20px"}
        gap={5}
      >
        <GridItem
          className="flex border"
          justifyContent={"center"}
          borderRadius={5}
          padding={"10px"}
          position={"relative"}
        >
          <Image src={data[0]?.image} alt={data?.name} />

          <Flex
            position={"absolute"}
            top={0}
            right={0}
            padding={"15px"}
            color={"gray.400"}
            className="hover:text-red-500"
            cursor={"pointer"}
          >
            <FaHeart />
          </Flex>
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

      <Flex flexDir={"column"} mb={30}>
        <Heading
          as={"h5"}
          fontSize={16}
          fontWeight={700}
          textTransform={"uppercase"}
        >
          Đánh giá sản phẩm
        </Heading>

        <Textarea
          placeholder="Comment..."
          border={"1px solid #ccc"}
          padding={"5px"}
        />

        <Flex flexDir={"column"} gap={2} paddingBlock={5}>
          {[1, 2, 3].map((value, index) => (
            <Card.Root className="shadow-lg" key={index}>
              <Card.Body bgColor={"white"}>
                <HStack mb="2" gap="3">
                  <Avatar
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    name="Nate Foss"
                  />
                  <Stack gap="0">
                    <Text fontWeight="semibold" textStyle="sm" color={"black"}>
                      Nate Foss
                    </Text>
                    <Text color="fg.muted" textStyle="sm">
                      @natefoss
                    </Text>
                  </Stack>
                </HStack>
                <Card.Description>
                  Nate Foss has requested to join your team. You can approve or
                  decline their request.
                </Card.Description>
              </Card.Body>
            </Card.Root>
          ))}
        </Flex>
      </Flex>

      <ProductSale title="Sản phẩm liên quan" />
    </Flex>
  );
}
