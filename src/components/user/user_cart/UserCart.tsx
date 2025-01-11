import { Flex } from "@chakra-ui/react";
import React from "react";
import UserCartDrawer from "./UserCartDrawer";
import UserForm from "../user_form/UserForm";
import { Users } from "@/lib/type/users";

export default function UserCart({
  data,
  userId,
}: {
  data: Users[];
  userId: string;
}) {
  return (
    <Flex alignItems={"center"} gap={3}>
      <UserCartDrawer data={data} userId={userId} />
      <UserForm data={data} />
    </Flex>
  );
}
