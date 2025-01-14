import { VegetableFruit } from "@/lib/type/vegetable_fruit";
import { Button, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import CalculateSalePrice from "../../../../utils/CalculateSalePrice";

export default function ProductSaleItem({ value }: { value: VegetableFruit }) {
  const handleLink = () => {
    window.location.href = `/fresh-products/${value._id}`;
  };
  return (
    <div className="embla__slide-product-sale">
      <div className="embla__slide__number-product-sale gap-3">
        <Link href={`/fresh-products/${value._id}`}>
          <Image src={value.image} alt={value.name} h={"100px"} w={"100px"} />
        </Link>

        <Flex flexDir={"column"} gap={3}>
          <Heading
            as={"h4"}
            fontSize={16}
            textTransform={"capitalize"}
            fontWeight={700}
          >
            {value.name}
          </Heading>

          <Text fontSize={16} color={"red.500"} fontWeight={700}>
            {Intl.NumberFormat("vi-VN").format(
              CalculateSalePrice(value.price_per_kg, value.discount)
            )}
            ₫/kg
          </Text>

          <Flex gap={2} alignItems={"center"}>
            <Text as={"s"} fontSize={14} color={"gray.500"}>
              {Intl.NumberFormat("vi-VN").format(Number(value.price_per_kg))}
              ₫/kg
            </Text>
            <Text
              fontSize={14}
              bgColor={"red.500"}
              color={"white"}
              fontWeight={600}
              borderRadius={"2px"}
              textAlign={"center"}
              paddingInline={"3px"}
            >
              -{value.discount}%
            </Text>
          </Flex>

          <Flex alignItems={"center"} gap={2}>
            <Button
              variant={"solid"}
              bgColor={"green.500"}
              color={"white"}
              paddingInline={"10px"}
              cursor={"pointer"}
              onClick={handleLink}
            >
              Mua ngay
            </Button>
          </Flex>
        </Flex>
      </div>
    </div>
  );
}
