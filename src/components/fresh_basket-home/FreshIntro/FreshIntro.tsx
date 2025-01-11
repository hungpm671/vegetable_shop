import React from "react";
import { Flex, Grid, GridItem, Heading, Image, Text } from "@chakra-ui/react";
import { FaHandsHelping, FaSeedling, FaShippingFast } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";

export default function FreshIntro() {
  return (
    <Flex flexDir={"column"} marginBlock={50} id="about">
      <Heading
        as={"h1"}
        fontSize={48}
        textAlign={"center"}
        mb={30}
        fontWeight={700}
      >
        Giới Thiệu
      </Heading>

      <Grid templateRows="repeat(2, 1fr)" templateColumns="1fr 1fr 1fr" gap={4}>
        <GridItem
          rowSpan={1}
          colSpan={1}
          className="flex"
          flexDir={"column"}
          alignItems={"center"}
          gap={2}
        >
          <FaSeedling size={24} className="text-green-600" />
          <Heading fontSize={24} fontWeight={700}>
            Nguồn gốc rõ ràng
          </Heading>
          <Text textAlign={"center"}>
            Cửa hàng cam kết cung cấp rau củ từ các trang trại đạt chuẩn
            VietGAP/GlobalGAP, đảm bảo nguồn gốc xuất xứ rõ ràng. Mỗi sản phẩm
            đều đi kèm thông tin chi tiết về nông trại, giúp khách hàng an tâm
            về chất lượng và độ an toàn.
          </Text>
        </GridItem>

        <GridItem rowSpan={2} colSpan={1} bg="green.100">
          <Image
            src="https://techmaster-vietnam.github.io/thuc-pham-huu-co/image/introduce.jpg"
            alt=""
          />
        </GridItem>

        <GridItem
          rowSpan={1}
          colSpan={1}
          className="flex"
          flexDir={"column"}
          alignItems={"center"}
          gap={2}
        >
          <BiSolidLike size={24} className="text-blue-600" />
          <Heading fontSize={24} fontWeight={700}>
            Chất lượng đảm bảo
          </Heading>
          <Text textAlign={"center"}>
            Rau củ luôn được chọn lọc kỹ càng, đảm bảo tươi ngon trước khi giao
            đến tay khách hàng. Cửa hàng tuyệt đối nói không với hóa chất bảo
            quản và thuốc trừ sâu độc hại, mang đến sự an tâm tuyệt đối trong
            từng bữa ăn.
          </Text>
        </GridItem>

        <GridItem
          rowSpan={1}
          colSpan={1}
          className="flex"
          flexDir={"column"}
          alignItems={"center"}
          gap={2}
        >
          <FaShippingFast size={24} className="text-red-600" />
          <Heading fontSize={24} fontWeight={700}>
            Dịch vụ vận chuyển nhanh chóng
          </Heading>
          <Text textAlign={"center"}>
            Hệ thống vận chuyển được tối ưu hóa để giao hàng nhanh nhất đến
            khách hàng. Rau củ được đóng gói cẩn thận, bảo quản ở nhiệt độ phù
            hợp để đảm bảo độ tươi ngon trong suốt quá trình vận chuyển. Hỗ trợ
            giao hàng miễn phí cho các đơn hàng lớn.
          </Text>
        </GridItem>

        <GridItem
          rowSpan={1}
          colSpan={1}
          className="flex"
          flexDir={"column"}
          alignItems={"center"}
          gap={2}
        >
          <FaHandsHelping size={24} />
          <Heading fontSize={24} fontWeight={700}>
            Dịch vụ khách hàng chuyên nghiệp
          </Heading>
          <Text textAlign={"center"}>
            Chúng tôi luôn đặt sự hài lòng của khách hàng lên hàng đầu. Chính
            sách đổi trả minh bạch giúp bạn yên tâm khi mua sắm. Đội ngũ tư vấn
            viên tận tâm luôn sẵn sàng hỗ trợ mọi thắc mắc của bạn một cách
            nhanh chóng và chuyên nghiệp.
          </Text>
        </GridItem>
      </Grid>
    </Flex>
  );
}
