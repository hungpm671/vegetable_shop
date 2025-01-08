import React from "react";
import { Flex, Image, Link, Text } from "@chakra-ui/react";
import { VegetableFruit } from "@/lib/type/vegetable_fruit";
import CalculateSalePrice from "../../../../utils/CalculateSalePrice";
import { useQuery } from "@tanstack/react-query";
import { getVegetableFruit } from "@/_action/vegetableAction";
import { useFreshBasketStore } from "@/lib/stores/fresh-basket";

export default function ProductSearchItem() {
  const { inputValueSearch } = useFreshBasketStore((state) => state);

  const { data, isLoading } = useQuery({
    queryKey: ["vegetables"],
    queryFn: async () => await getVegetableFruit(),
  });

  const filteredData = data?.filter((item: VegetableFruit) =>
    item.name.toLowerCase().includes(inputValueSearch.toLowerCase())
  );

  if (isLoading) return "Loading...";

  return (
    <Flex flexDir={"column"}>
      <Text fontWeight={600} paddingBlock={"10px"} fontSize={14}>
        Sản phẩm <span className="text-gray-400">{filteredData.length}</span>
      </Text>

      {filteredData?.map((value: VegetableFruit, index: number) => (
        <Link href={`/fresh-products/${value._id}`} key={index}>
          <Flex
            className="border-b hover:bg-gray-200"
            paddingBlock={"5px"}
            gap={2}
            cursor={"pointer"}
            flex={1}
          >
            <Image src={value.image} alt={value.name} w={50} h={50} />
            <Flex flexDir={"column"}>
              <Text textTransform={"capitalize"} fontWeight={600}>
                {value.name}
              </Text>
              <Text color={"red.400"} fontSize={12}>
                {Intl.NumberFormat("vi-VN").format(
                  CalculateSalePrice(value.price_per_kg, value.discount)
                )}
                đ
              </Text>
            </Flex>
          </Flex>
        </Link>
      ))}
    </Flex>
  );
}
