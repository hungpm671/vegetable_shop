import { VegetableFruit } from "@/lib/type/vegetable_fruit";
import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import CalculateSalePrice from "../../../../utils/CalculateSalePrice";

export default function ProductSaleItem({ value }: { value: VegetableFruit }) {
  const handleLink = () => {
    window.location.href = `/fresh-products/${value._id}`;
  };
  return (
    <Flex className="embla__slide_product-sale" justifyContent={"center"}>
      <Flex
        className="embla__slide__number_product-sale"
        flexDir={"column"}
        onClick={handleLink}
      >
        <Flex justifyContent={"center"}>
          <Image
            src={value.image}
            alt={value.name}
            maxW={{ base: "100px", lg: "150px" }}
            maxH={{ base: "100px", lg: "150px" }}
            objectFit={"cover"}
          />
        </Flex>
        <Flex flexDir={"column"} w={"full"}>
          <Text
            fontWeight={400}
            textTransform={"capitalize"}
            fontSize={14}
            marginBlock={3}
          >
            {value.name}
          </Text>

          <Flex justifyContent={"space-between"} alignContent={"center"}>
            <Flex alignItems={"center"} gap={2}>
              <Text fontSize={14} color={"red.500"} fontWeight={700}>
                {Intl.NumberFormat("vi-VN").format(
                  CalculateSalePrice(value.price_per_kg, value.discount)
                )}
                ₫
              </Text>

              <Text as={"s"} fontSize={12} fontWeight={400} color={"gray.500"}>
                {Intl.NumberFormat("vi-VN").format(Number(value.price_per_kg))}₫
              </Text>
            </Flex>

            <Text
              fontWeight={600}
              fontSize={14}
              color={"white"}
              bg={"red.500"}
              paddingInline={"5px"}
              borderRadius={"sm"}
            >
              -{value.discount}%
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
