import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@chakra-ui/react";
import { FaArrowsRotate } from "react-icons/fa6";
import OrderItem from "../OrderItem";
import { Order } from "@/lib/type/users";
import dateFormat from "../../../../../utils/DateFormat";

export default function OrderReturn({ value }: { value: Order }) {
  return (
    <AccordionItem value={value.toString()}>
      <AccordionItemTrigger className="flex" color={"red.600"}>
        <FaArrowsRotate /> {dateFormat(value?.createdAt)}
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

          <Box
            color={"red.600"}
            fontSize={14}
            className="flex"
            flexDir={"column"}
            alignItems={"end"}
          >
            <Text className="flex" alignItems={"center"} gap={1} fontSize={12}>
              Đơn hàng của bạn đang trong quá trình hoàn trả. Vui lòng chờ cập
              nhật tiếp theo!
              <FaArrowsRotate color={"red.600"} />
            </Text>
          </Box>
        </Flex>
      </AccordionItemContent>
    </AccordionItem>
  );
}
