import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@chakra-ui/react";
import { FaRegCreditCard, FaShippingFast } from "react-icons/fa";
import OrderItem from "../OrderItem";
import { Order } from "@/lib/type/users";
import dateFormat from "../../../../../../utils/DateFormat";
import { MdPlace } from "react-icons/md";

export default function OrderShipping({ value }: { value: Order }) {
  return (
    <AccordionItem value={value.toString()}>
      <AccordionItemTrigger className="flex" color={"yellow.600"}>
        <FaShippingFast /> {dateFormat(value?.createdAt)}
        <Stack minW="100px" flex={1}>
          <Progress.Root defaultValue={75} variant="outline" striped animated>
            <Progress.Track>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
        </Stack>
      </AccordionItemTrigger>
      <AccordionItemContent bgColor={"gray.300"}>
        <Box bgColor={"white"} padding={"10px"} mb={2}>
          <Heading as={"h5"} fontSize={14} fontWeight={600}>
            Địa chỉ nhận hàng
          </Heading>
          <Flex alignItems={"center"} gap={3}>
            <MdPlace />
            <Flex flexDir={"column"}>
              <Flex align={"center"} gap={2}>
                <Text>{value.customer_name}</Text>
                <Text color={"gray.400"} fontSize={12}>
                  (+84){value.customer_phone}
                </Text>
              </Flex>
              <Text
                fontSize={12}
              >{`${value.address}, ${value.ward.name}, ${value.district.name}, ${value.province.name}, ${value.country}`}</Text>
            </Flex>
          </Flex>

          <Flex alignItems={"center"} gap={3} mt={"10px"}>
            <FaRegCreditCard />
            <Text fontSize={12}>
              {value.payment_method === "cod"
                ? "Thanh toán khi nhận hàng"
                : "Chuyển khoản ngân hàng"}
            </Text>
          </Flex>
        </Box>

        <Box bgColor={"white"} paddingInline={"10px"}>
          {value.products?.map((item, index) => (
            <OrderItem key={index} item={item} />
          ))}
        </Box>

        <Flex
          mt={2}
          alignItems={"end"}
          flexDir={"column"}
          padding={"10px"}
          bgColor={"white"}
        >
          <Text>{`Tổng số tiền (${value.products.length} sản phẩm): ${Intl.NumberFormat(
            "vi-VN"
          ).format(value.total_orders)}₫`}</Text>
          <Box color={"red.600"} fontSize={14} textAlign={"end"}>
            <Text
              className="flex"
              alignItems={"center"}
              justifyContent={"flex-end"}
              gap={1}
              fontSize={12}
            >
              Đơn hàng của bạn đang được vận chuyển
              <FaShippingFast color={"red.600"} />
            </Text>

            <Text fontSize={12}>
              *Vui lòng để ý điện thoại để nhận hàng kịp thời!
            </Text>

            <button className="bg-red-600 text-white p-[10px] rounded">
              Đã nhận
            </button>
          </Box>
        </Flex>
      </AccordionItemContent>
    </AccordionItem>
  );
}
