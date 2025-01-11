import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import UserFormLogin from "../user_form/UserFormLogin";
import UserFormRegister from "../user_form/UserFormRegister";

export default function GuestNotLoggedIn() {
  const handleClick = () => {
    const formController = document.querySelector(".form_controller");
    if (formController) {
      formController.classList.toggle("active");
    }
  };
  return (
    <Flex position={"relative"}>
      <Button className="flex rounded-full" onClick={handleClick}>
        <Avatar src="https://bit.ly/broken-link" colorPalette="black" />
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
        <UserFormLogin />
        <UserFormRegister />
      </Flex>
    </Flex>
  );
}
