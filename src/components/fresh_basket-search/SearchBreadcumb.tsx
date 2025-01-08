"use client";

import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "@/components/ui/breadcrumb";
import { Button, Flex, Text } from "@chakra-ui/react";
import { IoMdHome } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { LiaSlashSolid } from "react-icons/lia";
import { MdStore } from "react-icons/md";
import FreshProductFilter from "./SearchProductFilter";

export const SearchBreadcumb = ({
  params,
  amount,
}: {
  params: string | null;
  amount: number;
}) => {
  const hanldeShowFilter = () => {
    const searchFilter = document.querySelector(
      ".search_filter"
    ) as HTMLElement;
    searchFilter.classList.toggle("active");
  };

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      paddingBlock={"15px"}
    >
      <BreadcrumbRoot separator={<LiaSlashSolid />}>
        <BreadcrumbLink href="/">
          <IoMdHome /> Trang chủ
        </BreadcrumbLink>
        <BreadcrumbLink href="/">
          <MdStore /> Cửa hàng
        </BreadcrumbLink>
        <BreadcrumbCurrentLink
          color={"black"}
          className="flex"
          alignItems={"center"}
          gap={2}
          fontWeight={600}
        >
          Kết quả tìm kiếm <span className="underline">{`"${params}"`}</span>
        </BreadcrumbCurrentLink>
      </BreadcrumbRoot>

      <Flex gap={2} alignItems={"center"}>
        <Text>Hiển thị {amount} sản phẩm</Text>
        <Flex flexDir={"column"} position={"relative"}>
          <Button
            variant="outline"
            size="sm"
            className="relative rounded-full p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            onClick={hanldeShowFilter}
          >
            <IoFilterSharp aria-hidden="true" className="size-6" />
          </Button>
          <FreshProductFilter />
        </Flex>
      </Flex>
    </Flex>
  );
};
