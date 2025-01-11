"use client";

import { Button } from "@/components/ui/button";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { EmptyState } from "@/components/ui/empty-state";
import { PiSmileyMeltingBold } from "react-icons/pi";

const GuestCart = () => {
  const [open, setOpen] = useState(false);

  return (
    <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)} size="md">
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <TiShoppingCart aria-hidden="true" className="size-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent bgColor={"gray.300"}>
        <DrawerHeader>
          <DrawerTitle
            textTransform={"capitalize"}
            fontWeight={700}
            fontSize={24}
          >
            Giỏ hàng
          </DrawerTitle>
        </DrawerHeader>

        <DrawerBody className="flex" flexDir={"column"} gap={1}>
          <EmptyState
            icon={<PiSmileyMeltingBold />}
            title="Có vẻ như bạn chưa đăng nhập"
            description="Tính năng này yêu cầu đăng nhập. Đừng bỏ lỡ, đăng nhập ngay thôi!"
            fontSize={20}
          />
        </DrawerBody>
        <DrawerFooter>
          <DrawerActionTrigger asChild>
            <Button
              variant="outline"
              bgColor={"gray.700"}
              color={"white"}
              paddingInline={"10px"}
            >
              Cancel
            </Button>
          </DrawerActionTrigger>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};

export default GuestCart;
