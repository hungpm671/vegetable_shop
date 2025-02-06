import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@chakra-ui/react";
import { TbCancel } from "react-icons/tb";
import { Order } from "@/lib/type/users";
import OrderItem from "../OrderItem";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import dateFormat from "../../../../../utils/DateFormat";

export default function OrderCanceled({ value }: { value: Order }) {
  return (
    <AccordionItem value={value.toString()}>
      <AccordionItemTrigger className="flex">
        <TbCancel /> {dateFormat(value?.createdAt)}
        <Stack minW="100px" flex={1}>
          <Progress.Root defaultValue={0} variant="outline" striped>
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

          <Box
            color={"red.600"}
            fontSize={14}
            className="flex"
            flexDir={"column"}
            alignItems={"end"}
          >
            <Text className="flex" alignItems={"center"} gap={1} fontSize={12}>
              Bạn muốn hủy đơn hàng? Vui lòng chờ cập nhật từ chúng tôi!
              <TbCancel color={"red.600"} />
            </Text>

            <button
              className="border-2 border-red-600 text-red-600 p-[10px] rounded flex items-center gap-2 opacity-50 cursor-not-allowed"
              disabled
            >
              <AiOutlineLoading3Quarters className="animate-spin text-blue-500 text-sm" />
              Đang hủy
            </button>
          </Box>
        </Flex>
      </AccordionItemContent>
    </AccordionItem>
  );
}
