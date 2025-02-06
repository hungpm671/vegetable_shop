import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@chakra-ui/react";
import { FaShippingFast } from "react-icons/fa";
import OrderItem from "../OrderItem";
import { Order } from "@/lib/type/users";
import dateFormat from "../../../../../utils/DateFormat";

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
      <AccordionItemContent bgColor={"white"} padding={"10px"}>
        {value.products?.map((item, index) => (
          <OrderItem key={index} item={item} />
        ))}
        <Flex mt={2} alignItems={"end"} flexDir={"column"}>
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
