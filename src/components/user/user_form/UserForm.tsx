"use client";

import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import "./style.css";
import UserFormLogout from "./UserFormLogout";
import { Users } from "@/lib/type/users";
import UserInfomation from "./UserInfomation";
import UserOrder from "./UserOrder";

export default function UserForm({ data }: { data: Users[] }) {
  const handleClick = () => {
    const formController = document.querySelector(".form_controller");
    if (formController) {
      formController.classList.toggle("active");
    }
  };

  return (
    <Flex position={"relative"}>
      <Button className="flex rounded-full" onClick={handleClick}>
        <Avatar
          name={data[0]?.username}
          colorPalette="pink"
          src={data[0]?.avatar_url}
        />
      </Button>

      <Flex
        flexDir={"column"}
        position={"absolute"}
        right={0}
        top={53}
        bgColor={"white"}
        w={150}
        className="form_controller rounded-lg"
      >
        <UserInfomation />
        <UserOrder />
        <UserFormLogout />
      </Flex>
    </Flex>
  );
}
