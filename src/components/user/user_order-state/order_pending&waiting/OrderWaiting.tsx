import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@chakra-ui/react";
import { LuPackageOpen } from "react-icons/lu";
import { Order } from "@/lib/type/users";
import OrderItem from "../OrderItem";
import dateFormat from "../../../../../utils/DateFormat";

export default function OrderWaiting({ value }: { value: Order }) {
  return (
    <AccordionItem value={value.toString()}>
      <AccordionItemTrigger className="flex" color={"green.600"}>
        <LuPackageOpen /> {dateFormat(value?.createdAt)}
        <Stack minW="100px" flex={1}>
          <Progress.Root defaultValue={50} variant="outline" striped animated>
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
            <Text className="flex" alignItems={"center"} gap={1} fontSize={12}>
              Đơn hàng của bạn đang được chuẩn bị
              <LuPackageOpen color={"red.600"} />
            </Text>
            <button className="bg-red-600 text-white p-[10px] rounded">
              Hủy đơn
            </button>
          </Box>
        </Flex>
      </AccordionItemContent>
    </AccordionItem>
  );
}
