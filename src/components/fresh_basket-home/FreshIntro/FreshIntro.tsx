import React from "react";
import { Flex, Grid, GridItem, Heading, Image, Text } from "@chakra-ui/react";
import { FaHandsHelping, FaSeedling, FaShippingFast } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";

export default function FreshIntro() {
  return (
    <Flex
      className="max-w-7xl"
      flexDir={"column"}
      marginBlock={50}
      id="about"
      marginInline={{ base: 5, md: 10, xl: "auto" }}
    >
      <Heading
        as={"h1"}
        fontSize={{ base: "35px", md: "40px", lg: "45px" }}
        textAlign={"center"}
        mb={30}
        fontWeight={700}
      >
        Giới Thiệu
      </Heading>

      <Grid templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }} gap={5}>
        <GridItem
          colSpan={1}
          className="flex"
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={4}
        >
          <Flex flexDir={"column"} alignItems={"center"}>
            <FaSeedling size={24} className="text-green-600" />
            <Heading fontSize={24} fontWeight={700} textAlign={"center"}>
              Nguồn gốc rõ ràng
            </Heading>
            <Text textAlign={"center"}>
              Cửa hàng cam kết cung cấp rau củ từ các trang trại đạt chuẩn
              VietGAP/GlobalGAP, đảm bảo nguồn gốc xuất xứ rõ ràng. Mỗi sản phẩm
              đều đi kèm thông tin chi tiết về nông trại, giúp khách hàng an tâm
              về chất lượng và độ an toàn.
            </Text>
          </Flex>

          <Flex flexDir={"column"} alignItems={"center"}>
            <FaShippingFast size={24} className="text-red-600" />
            <Heading fontSize={24} fontWeight={700} textAlign={"center"}>
              Dịch vụ vận chuyển nhanh chóng
            </Heading>
            <Text textAlign={"center"}>
              Hệ thống vận chuyển được tối ưu hóa để giao hàng nhanh nhất đến
              khách hàng. Rau củ được đóng gói cẩn thận, bảo quản ở nhiệt độ phù
              hợp để đảm bảo độ tươi ngon trong suốt quá trình vận chuyển. Hỗ
              trợ giao hàng miễn phí cho các đơn hàng lớn.
            </Text>
          </Flex>
        </GridItem>

        <GridItem colSpan={1} className="flex" justifyContent={"center"}>
          <Image
            src="https://techmaster-vietnam.github.io/thuc-pham-huu-co/image/introduce.jpg"
            alt=""
          />
        </GridItem>

        <GridItem
          colSpan={1}
          className="flex"
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={4}
        >
          <Flex flexDir={"column"} alignItems={"center"}>
            <BiSolidLike size={24} className="text-blue-600" />
            <Heading fontSize={24} fontWeight={700} textAlign={"center"}>
              Chất lượng đảm bảo
            </Heading>
            <Text textAlign={"center"}>
              Rau củ luôn được chọn lọc kỹ càng, đảm bảo tươi ngon trước khi
              giao đến tay khách hàng. Cửa hàng tuyệt đối nói không với hóa chất
              bảo quản và thuốc trừ sâu độc hại, mang đến sự an tâm tuyệt đối
              trong từng bữa ăn.
            </Text>
          </Flex>

          <Flex flexDir={"column"} alignItems={"center"}>
            <FaHandsHelping size={24} />
            <Heading fontSize={24} fontWeight={700} textAlign={"center"}>
              Dịch vụ khách hàng chuyên nghiệp
            </Heading>
            <Text textAlign={"center"}>
              Chúng tôi luôn đặt sự hài lòng của khách hàng lên hàng đầu. Chính
              sách đổi trả minh bạch giúp bạn yên tâm khi mua sắm. Đội ngũ tư
              vấn viên tận tâm luôn sẵn sàng hỗ trợ mọi thắc mắc của bạn một
              cách nhanh chóng và chuyên nghiệp.
            </Text>
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
}
