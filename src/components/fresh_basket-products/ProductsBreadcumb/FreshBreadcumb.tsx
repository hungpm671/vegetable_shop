import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "@/components/ui/breadcrumb";
import { Flex, Text } from "@chakra-ui/react";
import { IoMdHome } from "react-icons/io";
import { LiaSlashSolid } from "react-icons/lia";
import { MdStore } from "react-icons/md";

export const FreshBreadcumb = () => {
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
        <BreadcrumbCurrentLink
          color={"black"}
          className="flex"
          alignItems={"center"}
          gap={2}
        >
          <MdStore /> Cửa hàng
        </BreadcrumbCurrentLink>
      </BreadcrumbRoot>

      <Text>Hiển thị 9 sản phẩm</Text>
    </Flex>
  );
};
