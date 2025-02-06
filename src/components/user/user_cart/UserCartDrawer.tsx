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
import TotalCart from "../../../../utils/TotalCart";
import { EmptyState } from "@/components/ui/empty-state";
import { LuShoppingCart } from "react-icons/lu";
import ProductCartItem from "@/components/fresh_basket-home/FreshProductCart/ProductCartItem";
import { useUsersStore } from "@/lib/stores/users";
import { orderByUser } from "@/_action/userAction";
import { toaster } from "@/components/ui/toaster";

const UserCartDrawer = ({ userId }: { userId: string }) => {
  const { cartUser, setCartUser } = useUsersStore((state) => state);

  const [open, setOpen] = useState(false);

  const handleOrder = async () => {
    if (userId) {
      const result = await orderByUser(userId, cartUser);

      if (result.errorMsg) {
        toaster.create({
          title: "Thất bại",
          type: "warning",
          description: `"Error adding product to cart:" ${result.errorMsg}`,
        });
      } else {
        setCartUser([]);
        toaster.success({
          title: "Đặt hàng thành công!",
          description: result.message,
        });
      }
    } else {
      toaster.create({
        title: "Warning",
        type: "warning",
        description: "User not logged in, please login to add product to cart.",
      });
    }
  };

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
          {cartUser.length > 0 ? (
            cartUser.map((value, index) => (
              <ProductCartItem key={index} value={value} />
            ))
          ) : (
            <EmptyCart />
          )}
        </DrawerBody>

        <DrawerFooter>
          {cartUser.length > 0 && (
            <Button
              bgColor={"green.500"}
              paddingInline={"10px"}
              color={"white"}
              fontWeight={700}
              onClick={handleOrder}
            >
              <TotalCart />
            </Button>
          )}
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

export default UserCartDrawer;

const EmptyCart = () => {
  return (
    <EmptyState
      icon={<LuShoppingCart />}
      title="Your cart is empty"
      description="Explore our products and add items to your cart"
    />
  );
};
