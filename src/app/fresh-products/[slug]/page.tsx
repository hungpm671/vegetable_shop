"use client";

import {
  getVegetableFruitItem,
  updateVegetableFruitComment,
  updateVegetableFruitWishlist,
} from "@/_action/vegetableItemAction";
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
import { useFreshBasketStore } from "@/lib/stores/fresh-basket";
import "./style.css";
import { CalculateWeightPrice } from "../../../../utils/CalculateWeightPrice";
import { addToCart } from "@/_action/userAction";
import { toaster } from "@/components/ui/toaster";
import { useUsersStore } from "@/lib/stores/users";
import mongoose from "mongoose";
import { Comments, Wishlist } from "@/lib/type/vegetable_fruit";
import ProductComment from "@/components/fresh_basket-product_info/ProductComment";
import { TfiCommentAlt } from "react-icons/tfi";

export default function FreshProductItem() {
  const {
    initialUnit,
    initialComments,
    initialWishlist,
    setInitialUnit,
    setComments,
    updateComment,
    setWishlist,
    updateWishlist,
  } = useFreshBasketStore((state) => state);

  const { updateCartUser } = useUsersStore((state) => state);

  const params = useParams();
  const { slug } = params;

  const userId =
    typeof window !== "undefined" ? sessionStorage.getItem("userId") : null; // sessionStorage user_id

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["courses", slug],
    queryFn: async () => {
      if (typeof slug === "string") {
        return await getVegetableFruitItem(slug);
      }
      throw new Error("Invalid slug value");
    },
  });

  // useEffect product
  useEffect(() => {
    if (isSuccess && data) {
      const weight = data[0]?.unit[0] ? Number(data[0]?.unit[0]) : 1;
      setInitialUnit(weight);
    }
  }, [isSuccess, data, setInitialUnit]);

  // useEffect comments
  useEffect(() => {
    if (isSuccess && data) {
      const comments = data[0]?.comments;
      setComments(comments);
    }
  }, [isSuccess, data, setComments]);

  // useEffect wishlist
  useEffect(() => {
    if (isSuccess && data) {
      const wishlist = data[0]?.wishlist;
      setWishlist(wishlist);
    }
  }, [isSuccess, data, setWishlist]);

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
          _id: new mongoose.Types.ObjectId() as mongoose.Types.ObjectId,
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

  const handleUpdateComments = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    productId: string
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const comment = (e.target as HTMLInputElement).value;
      if (userId && comment.trim()) {
        const result = await updateVegetableFruitComment(
          userId,
          productId,
          comment
        );

        if (result.errorMsg) {
          toaster.error({
            title: "Error",
            description: result.errorMsg,
          });
        } else {
          const comments = {
            _id: new mongoose.Types.ObjectId() as mongoose.Types.ObjectId,
            author: userId,
            content: comment.trim(),
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          updateComment(comments);
          toaster.success({
            title: "Cảm ơn vì đóng góp của bạn!",
            description: result.message,
          });
        }
      } else {
        toaster.create({
          title: "Warning",
          type: "warning",
          description: "User not logged in, please login to comment.",
        });
      }
    }
  };

  const handleAddWishlist = async (productId: string) => {
    if (userId) {
      const result = await updateVegetableFruitWishlist(productId, userId);

      if (result.errorMsg) {
        toaster.error({
          title: "Error",
          description: result.errorMsg,
        });
      } else {
        const wishlist = {
          _id: new mongoose.Types.ObjectId() as mongoose.Types.ObjectId,
          user_id: userId,
          like: false,
          dislike: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        updateWishlist(wishlist);
      }
    } else {
      toaster.create({
        title: "Warning",
        type: "warning",
        description:
          "User not logged in, please login to add product to wishlist.",
      });
    }
  };

  return (
    <>
      <Flex
        className="max-w-7xl"
        mt={"64px"}
        mb={50}
        flexDir={"column"}
        marginInline={{ base: 5, md: 10, xl: "auto" }}
      >
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
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
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
            <Image src={data[0]?.image} alt={data[0]?.name} />

            <Flex
              position={"absolute"}
              top={0}
              right={0}
              padding={"15px"}
              color={
                initialWishlist.find(
                  (item: Wishlist) => item.user_id.toString() === userId
                )
                  ? "red.600"
                  : "gray.400"
              }
              className="hover:text-red-500"
              cursor={"pointer"}
              onClick={() => handleAddWishlist(data[0]._id)}
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
                      className={`select_weight border px-2 py-1 rounded-md ${initialUnit === Number(item) ? "active" : ""}`}
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
                        CalculateWeightPrice(
                          data[0]?.price_per_kg,
                          initialUnit
                        ),
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
            onKeyDown={(e) => handleUpdateComments(e, data[0]._id)}
          />

          <Flex flexDir={"column"} gap={2} paddingBlock={5}>
            {initialComments.length > 0 ? (
              initialComments.map((value: Comments, index: number) => (
                <ProductComment key={index} value={value} />
              ))
            ) : (
              <EmptyState
                icon={<TfiCommentAlt />}
                title="Chia sẻ cảm nhận của bạn!"
                description="Hiện tại chưa có đánh giá nào. Đánh giá của bạn sẽ giúp chúng tôi cải thiện sản phẩm tốt hơn!"
              />
            )}
          </Flex>
        </Flex>
      </Flex>
      <ProductSale />
    </>
  );
}
