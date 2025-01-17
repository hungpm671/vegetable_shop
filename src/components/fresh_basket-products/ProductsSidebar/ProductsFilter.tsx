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

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilter(value);
    setFilterVegetableFruits(value, filterPrice);
  };

  const handleFilterPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilterPrice(value);
    setFilterVegetableFruits(filter, value);
  };

  return (
    <Flex flexDir={"column"}>
      <Flex
        flexDir={"column"}
        gap={4}
        borderBlockStart={"1px solid #ccc"}
        paddingBlock={"10px"}
      >
        <Heading textTransform={"uppercase"} fontWeight={700} fontSize={24}>
          Danh mục
        </Heading>
        <RadioGroup
          defaultValue="all"
          colorPalette={"green"}
          onChange={handleFilterChange}
          size={"sm"}
        >
          <HStack gap="3" flexDir={"column"} alignItems={"start"}>
            <Radio
              className="hover:bg-gray-300"
              w={"full"}
              paddingBlock={"3px"}
              value="all"
            >
              Tất cả
            </Radio>
            <Radio
              className="hover:bg-gray-300"
              w={"full"}
              paddingBlock={"3px"}
              value="fruit"
            >
              Hoa quả
            </Radio>
            <Radio
              className="hover:bg-gray-300"
              w={"full"}
              paddingBlock={"3px"}
              value="dry_food"
            >
              Thực phẩm khô
            </Radio>
            <Radio
              className="hover:bg-gray-300"
              w={"full"}
              paddingBlock={"3px"}
              value="vegetable"
            >
              Rau củ
            </Radio>
          </HStack>
        </RadioGroup>
      </Flex>

      <Flex
        flexDir={"column"}
        gap={4}
        borderBlockStart={"1px solid #ccc"}
        paddingBlock={"10px"}
      >
        <Heading textTransform={"uppercase"} fontWeight={700} fontSize={24}>
          Giá tiền
        </Heading>
        <RadioGroup
          defaultValue="all"
          colorPalette={"green"}
          onChange={handleFilterPrice}
          size={"sm"}
        >
          <HStack gap="3" flexDir={"column"} alignItems={"start"}>
            <Radio
              className="hover:bg-gray-300"
              w={"full"}
              paddingBlock={"3px"}
              value="all"
            >
              Tất cả
            </Radio>
            <Radio
              className="hover:bg-gray-300"
              w={"full"}
              paddingBlock={"3px"}
              value="under-10000"
            >
              Dưới 10.000₫
            </Radio>
            <Radio
              className="hover:bg-gray-300"
              w={"full"}
              paddingBlock={"3px"}
              value="from-10000-to-20000"
            >
              Từ 10.000₫ - 20.000₫
            </Radio>
            <Radio
              className="hover:bg-gray-300"
              w={"full"}
              paddingBlock={"3px"}
              value="from-20000-to-30000"
            >
              Từ 20.000₫ - 30.000₫
            </Radio>
            <Radio
              className="hover:bg-gray-300"
              w={"full"}
              paddingBlock={"3px"}
              value="above-30000"
            >
              Trên 30.000₫
            </Radio>
          </HStack>
        </RadioGroup>
      </Flex>

      <Flex
        flexDir={"column"}
        gap={4}
        borderBlockStart={"1px solid #ccc"}
        paddingBlock={"10px"}
      >
        <Heading textTransform={"uppercase"} fontWeight={700} fontSize={24}>
          Khác
        </Heading>
        <RadioGroup colorPalette={"green"} size={"sm"}>
          <HStack gap="3" flexDir={"column"} alignItems={"start"}>
            <Radio
              className="hover:bg-gray-300"
              w={"full"}
              paddingBlock={"3px"}
              value="1"
            >
              Nổi bật
            </Radio>
            <Radio
              className="hover:bg-gray-300"
              w={"full"}
              paddingBlock={"3px"}
              value="2"
            >
              Bán chạy
            </Radio>
            <Radio
              className="hover:bg-gray-300"
              w={"full"}
              paddingBlock={"3px"}
              value="3"
            >
              Mới nhất
            </Radio>
          </HStack>
        </RadioGroup>
      </Flex>
    </Flex>
  );
}
