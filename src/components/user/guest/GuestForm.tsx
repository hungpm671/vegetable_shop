import { Flex } from "@chakra-ui/react";
import React from "react";
import GuestCart from "./GuestCart";
import GuestNotLoggedIn from "./GuestNotLoggedIn";

export default function GuestForm() {
  return (
    <Flex alignItems={"center"} gap={3}>
      <GuestCart />
      <GuestNotLoggedIn />
    </Flex>
  );
}
