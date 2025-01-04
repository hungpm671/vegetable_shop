"use client";

import { Flex, Heading, HStack } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@/components/ui/radio";
import { useFreshBasketStore } from "@/lib/stores/fresh-basket";

export default function ProductsFilter() {
  const {
    filter,
    filterPrice,
    setFilter,
    setFilterPrice,
    setFilterVegetableFruits,
  } = useFreshBasketStore((state) => state);

  const handleFilterChange = (value: string | any) => {
    setFilter(value.target.value);
    setFilterVegetableFruits(value.target.value, filterPrice);
  };

  const handleFilterPrice = (value: string | any) => {
    setFilterPrice(value.target.value);
    setFilterVegetableFruits(filter, value.target.value);
  };

  return (
    <Flex flexDir={"column"}>
      <Flex
        flexDir={"column"}
        gap={4}
        borderBlockStart={"1px solid #ccc"}
        paddingBlockStart={"10px"}
      >
        <Heading textTransform={"uppercase"} fontWeight={700} fontSize={24}>
          Danh mục
        </Heading>
        <RadioGroup
          colorPalette={"green"}
          onChange={handleFilterChange}
          size={"sm"}
        >
          <HStack gap="3" flexDir={"column"} alignItems={"start"}>
            <Radio value="fruit">Hoa quả</Radio>
            <Radio value="dry_food">Thực phẩm khô</Radio>
            <Radio value="vegetable">Rau củ</Radio>
          </HStack>
        </RadioGroup>
      </Flex>

      <Flex
        flexDir={"column"}
        gap={4}
        borderBlockStart={"1px solid #ccc"}
        paddingBlockStart={"10px"}
      >
        <Heading textTransform={"uppercase"} fontWeight={700} fontSize={24}>
          Giá tiền
        </Heading>
        <RadioGroup
          colorPalette={"green"}
          onChange={handleFilterPrice}
          size={"sm"}
        >
          <HStack gap="3" flexDir={"column"} alignItems={"start"}>
            <Radio value="under-10000">Dưới 10.000₫</Radio>
            <Radio value="from-10000-to-20000">Từ 10.000₫ - 20.000₫</Radio>
            <Radio value="from-20000-to-30000">Từ 20.000₫ - 30.000₫</Radio>
            <Radio value="above-30000">Trên 30.000₫</Radio>
          </HStack>
        </RadioGroup>
      </Flex>

      <Flex
        flexDir={"column"}
        gap={4}
        borderBlockStart={"1px solid #ccc"}
        paddingBlockStart={"10px"}
      >
        <Heading textTransform={"uppercase"} fontWeight={700} fontSize={24}>
          Khác
        </Heading>
        <RadioGroup defaultValue="1" colorPalette={"green"} size={"sm"}>
          <HStack gap="3" flexDir={"column"} alignItems={"start"}>
            <Radio value="1">Nổi bật</Radio>
            <Radio value="2">Bán chạy</Radio>
            <Radio value="3">Mới nhất</Radio>
          </HStack>
        </RadioGroup>
      </Flex>
    </Flex>
  );
}
