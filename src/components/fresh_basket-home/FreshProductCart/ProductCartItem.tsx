import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { Cart } from "@/lib/type/users";
import { useQuery } from "@tanstack/react-query";
import { getVegetableFruitItem } from "@/_action/vegetableItemAction";
import { HStack, Stack } from "@chakra-ui/react";
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton";
import { useUsersStore } from "@/lib/stores/users";
import { removeCartUser, updateCartByQuantity } from "@/_action/userAction";
import { toaster } from "@/components/ui/toaster";
import CalculateSalePrice from "../../../../utils/CalculateSalePrice";
import { CalculateWeightPrice } from "../../../../utils/CalculateWeightPrice";

export default function ProductCartItem({ value }: { value: Cart }) {
  const { updateCartUserByQuantity, deleteCartUser } = useUsersStore(
    (state) => state
  );

  const userId =
    typeof window !== "undefined" ? sessionStorage.getItem("userId") : null;

  const { data, isLoading } = useQuery({
    queryKey: ["vegetable", value.product_id],
    queryFn: async () => await getVegetableFruitItem(value.product_id),
    enabled: !!value.product_id,
  });

  if (isLoading)
    return (
      <HStack gap="5">
        <SkeletonCircle size="12" />
        <Stack flex="1">
          <Skeleton height="5" />
          <Skeleton height="5" width="80%" />
        </Stack>
      </HStack>
    );

  const handleDeleteCartItem = async (
    id: string,
    productName: string,
    weight: number
  ) => {
    if (userId) {
      const result = await removeCartUser(userId, id, productName, weight);

      if (result.errorMsg) {
        toaster.create({
          title: "Warning",
          type: "warning",
          description: `"Error adding product to cart:" ${result.errorMsg}`,
        });
      } else {
        deleteCartUser(id, weight);
        toaster.error({
          title: "Sản phẩm đã được xóa khỏi giỏ hàng.",
          description: result.message,
        });
      }
    }
  };

  const handleUpdateQuantity = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    productId: string,
    weight: number
  ) => {
    if (e.key === "Enter") {
      const newQuantity = parseInt((e.target as HTMLInputElement).value);
      if (userId && newQuantity > 0) {
        const result = await updateCartByQuantity(
          userId,
          productId,
          weight,
          newQuantity
        );
        if (result.errorMsg) {
          toaster.create({
            title: "Warning",
            type: "warning",
            description: `"Error update product to cart:" ${result.errorMsg}`,
          });
        } else {
          updateCartUserByQuantity(productId, weight, newQuantity);
          toaster.success({
            title: "Giỏ hàng đã được thay đổi theo yêu cầu của bạn.",
            description: result.message,
          });
        }
      }
    }
  };

  return (
    <Flex
      bgColor={"white"}
      padding={"10px 5px"}
      className="rounded-md"
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Flex gap={4}>
        <Image
          src={data[0]?.image}
          alt={data[0]?.name}
          w={100}
          h={100}
          objectFit={"cover"}
        />

        <Flex flexDir={"column"} flex={1} gap={2}>
          <Heading
            as={"h4"}
            fontWeight={600}
            fontSize={17}
            textTransform={"capitalize"}
          >
            {data[0]?.name}
          </Heading>

          {/* <select
            name="unit_product"
            id="unit_product"
            className="bg-gray-100"
            defaultValue={value.weight}
          >
            {data[0]?.unit.map((item: number) => (
              <option key={item} value={item.toString()}>
                {item >= 1000 ? `${item / 1000}kg` : `${item}g`}
              </option>
            ))}
          </select> */}

          <Text fontWeight={600} fontSize={12}>
            Phân loại:{" "}
            {data[0]?.type === "fruit"
              ? "Hoa quả"
              : data[0]?.type === "vegetable"
                ? "Rau củ"
                : "Thực phẩm khô"}
          </Text>
          <Flex alignItems={"center"} justifyContent={"space-between"} gap={4}>
            <Flex alignItems={"center"}>
              <Text color={"red.400"}>
                {Intl.NumberFormat("vi-VN").format(
                  CalculateSalePrice(
                    CalculateWeightPrice(data[0]?.price_per_kg, value.weight),
                    value.discount
                  )
                )}
                ₫
              </Text>

              {data[0].unit.length > 0 && (
                <Text color={"gray.400"} fontSize={12}>
                  /
                  {value.weight >= 1000
                    ? `${value.weight / 1000}kg`
                    : `${value.weight}g`}
                </Text>
              )}
            </Flex>
            <Flex>
              <input
                type="number"
                defaultValue={value.quantity}
                className="border bg-white w-[50px]"
                onKeyDown={(e) =>
                  handleUpdateQuantity(e, value.product_id, value.weight)
                }
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Button
        bgColor={"red.600"}
        h={"100%"}
        onClick={() =>
          handleDeleteCartItem(
            value.product_id.toString(),
            data[0]?.name,
            value.weight
          )
        }
      >
        <MdDeleteForever color="white" />
      </Button>
    </Flex>
  );
}
