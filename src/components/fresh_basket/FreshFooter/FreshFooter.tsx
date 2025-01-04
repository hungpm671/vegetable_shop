import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaPhone, FaSquareFacebook } from "react-icons/fa6";
import { IoHome, IoMail } from "react-icons/io5";

export default function FreshFooter() {
  return (
    <Box backgroundColor={"black"} color={"#fff"} id="contact" w={"full"}>
      <Grid
        className="mx-auto max-w-7xl"
        templateColumns={"1fr 1fr 1fr"}
        gap={6}
        paddingBlock={50}
      >
        <GridItem className="flex" flexDir={"column"} gap={4}>
          <Heading
            textTransform={"uppercase"}
            fontSize={45}
            mb={5}
            fontWeight={700}
          >
            Fresh Food
          </Heading>
          <Text>Tươi sạch từ tâm, gửi trọn niềm tin!</Text>
          <Text fontSize={12}>http://freshfood.com</Text>
        </GridItem>

        <GridItem className="flex" flexDir={"column"} gap={3}>
          <Heading textTransform={"uppercase"} fontWeight={700} fontSize={18}>
            Liên kết
          </Heading>
          <Link fontSize={14} href="/">
            Trang chủ
          </Link>
          <Link fontSize={14} href="/fresh-products">
            Sản phẩm
          </Link>
          <Link fontSize={14} href="#about">
            Giới thiệu
          </Link>
          <Link fontSize={14} href="#news">
            Tin tức
          </Link>
          <Link fontSize={14} href="#contact">
            Liên hệ
          </Link>
        </GridItem>

        <GridItem className="flex" flexDir={"column"} gap={3}>
          <Heading textTransform={"uppercase"} fontWeight={700} fontSize={18}>
            Liên hệ
          </Heading>
          <Text className="flex" alignItems={"center"} gap={3} fontSize={14}>
            <IoHome /> Từ Liêm - Ba Đình - Hà Nội
          </Text>
          <Text className="flex" alignItems={"center"} gap={3} fontSize={14}>
            <FaPhone /> Hotline: 091 353 3457 - 09 1425 2542
          </Text>
          <Text className="flex" alignItems={"center"} gap={3} fontSize={14}>
            <IoMail />
            Email : freshfood@gmail.com
          </Text>
          <Text className="flex" alignItems={"center"} gap={3} fontSize={14}>
            <FaSquareFacebook /> Facebook : facebook.com/freshfood
          </Text>
        </GridItem>
      </Grid>
    </Box>
  );
}
