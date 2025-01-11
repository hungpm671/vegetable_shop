import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";

export default function FreshIntro_2() {
  return (
    <Box
      backgroundImage={
        "url('https://techmaster-vietnam.github.io/thuc-pham-huu-co/image/background-3.jpg')"
      }
      backgroundSize={"cover"}
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      padding={20}
    >
      <Flex flexDir={"column"} alignItems={"center"} gap={10}>
        <Box
          color={"white"}
          textAlign={"center"}
          fontSize={"xl"}
          fontWeight={"bold"}
        >
          <Heading as={"h2"} fontSize={28}>
            Hành Trình Khỏe Mạnh Bắt Đầu Từ Thực Phẩm Sạch
          </Heading>
        </Box>
        <Box color={"white"} textAlign={"center"} fontSize={"lg"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla illum
          cumque sit doloremque quasi similique iusto, distinctio rem iste unde
          consectetur fugiat, debitis maiores mollitia eum? Dolore ad expedita
          ipsam.
        </Box>
        <Button
          textDecor={"underline"}
          backgroundColor={"green.500"}
          borderRadius={"3xl"}
          padding={"5px 15px"}
          w={100}
          color={"#fff"}
          _hover={{
            backgroundColor: "green.600",
            color: "#fff",
          }}
        >
          Xem Thêm
        </Button>
      </Flex>
    </Box>
  );
}
