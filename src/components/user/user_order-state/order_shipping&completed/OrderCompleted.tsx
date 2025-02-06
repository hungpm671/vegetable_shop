import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@chakra-ui/react";
import { GoChecklist } from "react-icons/go";
import { Order } from "@/lib/type/users";
import OrderItem from "../OrderItem";
import dateFormat from "../../../../../utils/DateFormat";

export default function OrderCompleted({ value }: { value: Order }) {
  return (
    <AccordionItem value={value.toString()}>
      <AccordionItemTrigger className="flex" color={"green.600"}>
        <GoChecklist /> {dateFormat(value?.createdAt)}
        <Stack minW="100px" flex={1}>
          <Progress.Root defaultValue={100} variant="outline" striped>
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
              Đơn hàng của bạn đã được giao thành công. Cảm ơn bạn đã ủng hộ!
              <GoChecklist color={"red.600"} />
            </Text>

            <button className="border-2 border-red-600 text-red-600 p-[10px] rounded">
              Trả hàng
            </button>
          </Box>
        </Flex>
      </AccordionItemContent>
    </AccordionItem>
  );
}
