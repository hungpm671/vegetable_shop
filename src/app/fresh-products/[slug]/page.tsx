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
import React, { useEffect } from "react";
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
import ProductSale from "@/components/fresh_basket-home/FreshProductSale/ProductSale";
import { Textarea } from "@chakra-ui/react";
import { Card, HStack, Stack } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { useFreshBasketStore } from "@/lib/stores/fresh-basket";
import "./style.css";
import { CalculateWeightPrice } from "../../../../utils/CalculateWeightPrice";
import { addToCart } from "@/_action/userAction";
import { toaster } from "@/components/ui/toaster";
import { useUsersStore } from "@/lib/stores/users";
import mongoose from "mongoose";

export default function FreshProductItem() {
  const { initialUnit, setInitialUnit } = useFreshBasketStore((state) => state);

  const { updateCartUser } = useUsersStore((state) => state);

  const params = useParams();
  const { slug } = params;
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["courses", slug],
    queryFn: async () => {
      if (typeof slug === "string") {
        return await getVegetableFruitItem(slug);
      }
      throw new Error("Invalid slug value");
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      setInitialUnit(Number(data[0]?.unit[0]));
    }
  }, [isSuccess, data, setInitialUnit]);

  if (isLoading) {
    return (
      <Flex className="mx-auto max-w-7xl" mt={"64px"} mb={50}>
        <EmptyState
          icon={<FaSpinner className="animate-spin text-blue-500 text-4xl" />}
          title="Đang tìm kiếm kết quả..."
          description="Chúng tôi đang xử lý thông tin và sẽ mang đến câu trả lời cho bạn ngay khi có thể. Vui lòng đợi trong giây lát!"
        />
      </Flex>
    );
  }

  console.log(data);

  const handleClickAvtive = (weight: number) => {
    setInitialUnit(weight);
  };

  const handleAddToCart = async (
    productName: string,
    productId: string,
    quantity: number,
    price: number,
    discount: number
  ) => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      const result = await addToCart(
        userId,
        productId,
        productName,
        quantity,
        price,
        discount,
        initialUnit
      );

      if (result.errorMsg) {
        toaster.create({
          title: "Thất bại",
          type: "warning",
          description: `"Error adding product to cart:" ${result.errorMsg}`,
        });
      } else {
        updateCartUser({
          _id: new mongoose.Types.ObjectId() as any,
          product_id: productId,
          quantity: quantity,
          price:
            initialUnit !== 0
              ? CalculateWeightPrice(price, initialUnit) * quantity
              : price * quantity,
          weight: Number(initialUnit),
          discount: discount,
          createdAt: new Date(),
          updateAt: new Date(),
        });
        toaster.success({
          title: "Sản phẩm đã được thêm vào giỏ hàng!",
          description: result.message,
        });
      }
    } else {
      toaster.create({
        title: "Warning",
        type: "warning",
        description: "User not logged in, please login to add product to cart.",
      });
    }
  };

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

          <hr />
          <Text fontSize={14} fontWeight={700}>
            Danh mục:{" "}
            {data[0].type === "fruit"
              ? "Hoa quả"
              : data[0].type === "vegetable"
                ? "Rau củ"
                : "Thực phẩm khô"}
          </Text>

          {data[0]?.unit.length > 0 ? (
            <>
              <Flex gap={1}>
                {data[0].unit.map((item: number) => (
                  <button
                    key={item}
                    className={`select_weight border px-2 py-1 rounded-md ${initialUnit === item ? "active" : ""}`}
                    onClick={() => handleClickAvtive(Number(item))}
                  >
                    {item >= 1000 ? `${item / 1000}kg` : `${item}g`}
                  </button>
                ))}
              </Flex>

              <Flex alignItems={"center"} gap={2}>
                <Text fontSize={16} color={"red.500"} fontWeight={700}>
                  {Intl.NumberFormat("vi-VN").format(
                    CalculateSalePrice(
                      CalculateWeightPrice(data[0]?.price_per_kg, initialUnit),
                      data[0]?.discount
                    )
                  )}
                  ₫
                </Text>

                {data[0].discount !== 0 && (
                  <Text
                    as={"s"}
                    fontSize={14}
                    color={"gray.400"}
                    fontWeight={700}
                  >
                    {Intl.NumberFormat("vi-VN").format(
                      CalculateWeightPrice(data[0]?.price_per_kg, initialUnit)
                    )}
                    ₫
                  </Text>
                )}
              </Flex>
            </>
          ) : (
            <Flex alignItems={"center"} gap={2}>
              <Text fontSize={16} color={"red.500"} fontWeight={700}>
                {Intl.NumberFormat("vi-VN").format(
                  CalculateSalePrice(data[0]?.price_per_kg, data[0]?.discount)
                )}
                ₫
              </Text>
            </Flex>
          )}

          <Button
            bgColor={"green.600"}
            color={"white"}
            onClick={() =>
              handleAddToCart(
                data[0].name,
                data[0]._id,
                1,
                data[0].price_per_kg,
                data[0].discount
              )
            }
          >
            Thêm vào giỏ hàng
          </Button>
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
