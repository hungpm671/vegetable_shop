"use client";

import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "@/components/ui/breadcrumb";
import { Flex, HStack, Text } from "@chakra-ui/react";
import { IoMdHome } from "react-icons/io";
import { LiaSlashSolid } from "react-icons/lia";
import { MdStore } from "react-icons/md";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  MenuTriggerItem,
} from "@/components/ui/menu";
import { IoSearchCircle } from "react-icons/io5";

import { Radio, RadioGroup } from "@/components/ui/radio";
import { useFreshBasketStore } from "@/lib/stores/fresh-basket";
import ProductSearch from "../ProductsSidebar/product_search/ProductSearch";

export const FreshBreadcumb = () => {
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
    <Flex
      alignItems={{ md: "center" }}
      justifyContent={{ md: "space-between" }}
      paddingBlock={"15px"}
      flexDir={{ base: "column", md: "row" }}
    >
      <BreadcrumbRoot separator={<LiaSlashSolid />}>
        <BreadcrumbLink href="/">
          <IoMdHome /> Trang chủ
        </BreadcrumbLink>
        <BreadcrumbCurrentLink
          color={"black"}
          className="flex"
          alignItems={"center"}
          gap={2}
        >
          <MdStore /> Cửa hàng
        </BreadcrumbCurrentLink>
      </BreadcrumbRoot>

      <Flex gap={3} alignItems={"center"}>
        <Text>Hiển thị 9 sản phẩm</Text>
        <MenuRoot>
          <MenuTrigger asChild>
            <IoSearchCircle size={24} />
          </MenuTrigger>
          <MenuContent>
            <MenuItem value="search">
              <ProductSearch />
            </MenuItem>

            <MenuRoot positioning={{ placement: "right-start", gutter: 2 }}>
              <MenuTriggerItem value="open-recent">Danh mục</MenuTriggerItem>
              <MenuContent>
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
              </MenuContent>
            </MenuRoot>

            <MenuRoot positioning={{ placement: "right-start", gutter: 2 }}>
              <MenuTriggerItem value="open-recent">Giá tiền</MenuTriggerItem>
              <MenuContent>
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
              </MenuContent>
            </MenuRoot>

            <MenuRoot positioning={{ placement: "right-start", gutter: 2 }}>
              <MenuTriggerItem value="open-recent">Nổi bật</MenuTriggerItem>
              <MenuContent>
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
              </MenuContent>
            </MenuRoot>
          </MenuContent>
        </MenuRoot>
      </Flex>
    </Flex>
  );
};
