import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import {
  DrawerBackdrop,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Tabs } from "@chakra-ui/react";
import { PiClockCountdown } from "react-icons/pi";
import { FaShippingFast } from "react-icons/fa";
import { Heading, Stack } from "@chakra-ui/react";
import { AccordionRoot } from "@/components/ui/accordion";
import OrderPending from "../user_order-state/order_pending&waiting/OrderPending";
import OrderWaiting from "../user_order-state/order_pending&waiting/OrderWaiting";
import OrderShipping from "../user_order-state/order_shipping&completed/OrderShipping";
import OrderCompleted from "../user_order-state/order_shipping&completed/OrderCompleted";
import { TbCancel } from "react-icons/tb";
import OrderCanceled from "../user_order-state/order_return&canceled/OrderCanceled";
import OrderReturn from "../user_order-state/order_return&canceled/OrderReturn";
import { EmptyState, VStack } from "@chakra-ui/react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/_action/userAction";
import { Order } from "@/lib/type/users";

export default function UserOrder() {
  const [orderStatus, setOrderStatus] = useState({
    pending: false,
    waiting: false,
    shipping: false,
    completed: false,
    canceled: false,
    returns: false,
  });

  const userId =
    typeof window !== "undefined" ? sessionStorage.getItem("userId") : null;

  const { data, isLoading } = useQuery({
    queryKey: ["userId", userId],
    queryFn: async () => await getUserInfo(userId!),
    enabled: !!userId,
  });

  if (isLoading) {
    return <EmptyOrders />;
  }

  const userOrders = data[0].orders;

  useEffect(() => {
    if (userOrders.length) {
      const status = {
        pending: userOrders.some((order: Order) => order.state === "pending"),
        waiting: userOrders.some((order: Order) => order.state === "waiting"),
        shipping: userOrders.some((order: Order) => order.state === "shipping"),
        completed: userOrders.some(
          (order: Order) => order.state === "completed"
        ),
        canceled: userOrders.some((order: Order) => order.state === "canceled"),
        returns: userOrders.some((order: Order) => order.state === "return"),
      };
      setOrderStatus(status);
    }
  }, [userOrders]);

  const { pending, waiting, shipping, completed, canceled, returns } =
    orderStatus;

  return (
    <DrawerRoot size="md">
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          justifyContent={"start"}
          paddingInline={2}
          className="hover:bg-gray-200"
          w={"full"}
        >
          <HiOutlineClipboardDocumentList /> Đơn hàng
        </Button>
      </DrawerTrigger>
      <DrawerContent
        bgColor={"gray.300"}
        padding={4}
        paddingTop={10}
        overflow="auto"
      >
        <Tabs.Root defaultValue="pending&waiting" activationMode="manual">
          <Tabs.List gap={3}>
            <Tabs.Trigger value="pending&waiting" color={"green.600"}>
              <PiClockCountdown />
              Đang xử lý đơn hàng
            </Tabs.Trigger>

            <Tabs.Trigger value="shipping&completed" color={"yellow.600"}>
              <FaShippingFast />
              Giao hàng & Hoàn tất
            </Tabs.Trigger>

            <Tabs.Trigger value="return&canceled" color={"red.600"}>
              <TbCancel />
              Hoàn trả & Hủy đơn
            </Tabs.Trigger>
          </Tabs.List>

          {/* pending & waiting */}
          <Tabs.Content
            value="pending&waiting"
            gap={6}
            className="flex"
            flexDir={"column"}
          >
            {pending || waiting ? (
              <>
                {/* pending */}
                {pending && (
                  <Stack width="full">
                    <Heading size="md" fontWeight={600}>
                      Đơn hàng rau củ đang chờ xác nhận
                    </Heading>
                    <AccordionRoot
                      size={"md"}
                      collapsible
                      className="flex"
                      flexDir={"column"}
                      gap={4}
                    >
                      {userOrders
                        ?.filter((value: Order) => value.state === "pending")
                        .map((value: Order, index: number) => (
                          <OrderPending
                            key={index}
                            value={value}
                            index={index}
                          />
                        ))}
                    </AccordionRoot>
                  </Stack>
                )}

                {/* waiting */}
                {waiting && (
                  <Stack width="full">
                    <Heading size="md" fontWeight={600}>
                      Đơn hàng rau củ đang chờ lấy hàng
                    </Heading>
                    <AccordionRoot
                      size={"md"}
                      collapsible
                      className="flex"
                      flexDir={"column"}
                      gap={4}
                    >
                      {userOrders
                        ?.filter((value: Order) => value.state === "waiting")
                        .map((value: Order, index: number) => (
                          <OrderWaiting key={index} value={value} />
                        ))}
                    </AccordionRoot>
                  </Stack>
                )}
              </>
            ) : (
              <EmptyOrders />
            )}
          </Tabs.Content>

          {/* shipping & completed */}
          <Tabs.Content
            value="shipping&completed"
            gap={6}
            className="flex"
            flexDir={"column"}
          >
            {shipping || completed ? (
              <>
                {/* shipping */}
                {shipping && (
                  <Stack width="full">
                    <Heading size="md" fontWeight={600}>
                      Đơn hàng rau củ đang lên đường
                    </Heading>
                    <AccordionRoot
                      size={"md"}
                      collapsible
                      className="flex"
                      flexDir={"column"}
                      gap={4}
                    >
                      {userOrders
                        ?.filter((value: Order) => value.state === "shipping")
                        .map((value: Order, index: number) => (
                          <OrderShipping key={index} value={value} />
                        ))}
                    </AccordionRoot>
                  </Stack>
                )}

                {/* completed */}
                {completed && (
                  <Stack width="full">
                    <Heading size="md" fontWeight={600}>
                      Rau củ tươi ngon đã đến tay bạn
                    </Heading>
                    <AccordionRoot
                      size={"md"}
                      collapsible
                      className="flex"
                      flexDir={"column"}
                      gap={4}
                    >
                      {userOrders
                        ?.filter((value: Order) => value.state === "completed")
                        .map((value: Order, index: number) => (
                          <OrderCompleted key={index} value={value} />
                        ))}
                    </AccordionRoot>
                  </Stack>
                )}
              </>
            ) : (
              <EmptyOrders />
            )}
          </Tabs.Content>

          {/* return & canceled */}
          <Tabs.Content
            value="return&canceled"
            gap={6}
            className="flex"
            flexDir={"column"}
          >
            {canceled || returns ? (
              <>
                {/* canceled */}
                {canceled && (
                  <Stack width="full">
                    <Heading size="md" fontWeight={600}>
                      Đơn hàng rau củ đã bị hủy
                    </Heading>
                    <AccordionRoot
                      size={"md"}
                      collapsible
                      className="flex"
                      flexDir={"column"}
                      gap={4}
                    >
                      {userOrders
                        ?.filter((value: Order) => value.state === "canceled")
                        .map((value: Order, index: number) => (
                          <OrderCanceled key={index} value={value} />
                        ))}
                    </AccordionRoot>
                  </Stack>
                )}

                {/* return */}
                {returns && (
                  <Stack width="full">
                    <Heading size="md" fontWeight={600}>
                      Đơn hàng rau củ đang được hoàn trả
                    </Heading>
                    <AccordionRoot
                      size={"md"}
                      collapsible
                      className="flex"
                      flexDir={"column"}
                      gap={4}
                    >
                      {userOrders
                        ?.filter((value: Order) => value.state === "return")
                        .map((value: Order, index: number) => (
                          <OrderReturn key={index} value={value} />
                        ))}
                    </AccordionRoot>
                  </Stack>
                )}
              </>
            ) : (
              <EmptyOrders />
            )}
          </Tabs.Content>
        </Tabs.Root>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
}

function EmptyOrders() {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <AiOutlineFileSearch />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>Bạn chưa có đơn hàng nào cả</EmptyState.Title>
          <EmptyState.Description>
            Bạn chưa thực hiện đơn hàng nào. Hãy thêm sản phẩm vào giỏ và hoàn
            tất đơn hàng!
          </EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
