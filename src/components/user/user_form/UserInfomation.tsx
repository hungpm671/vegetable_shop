import { Badge, HStack, VStack } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FiInfo } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo, updateUserInfo } from "@/_action/userAction";
import { FaPencilAlt } from "react-icons/fa";
import { Editable, IconButton } from "@chakra-ui/react";
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";
import { useEffect } from "react";
import { toaster } from "@/components/ui/toaster";
import dateFormat from "../../../../utils/DateFormat";
import { useUsersStore } from "@/lib/stores/users";

const UserInfomation = () => {
  const { userName, userPhone, setUserName, setUserPhone } = useUsersStore(
    (state) => state
  );

  const userId =
    typeof window !== "undefined" ? sessionStorage.getItem("userId") : null;

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["userId", userId],
    queryFn: async () => await getUserInfo(userId!),
    enabled: !!userId,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setUserName(data[0]?.full_name);
      setUserPhone(data[0]?.phone_number);
    }
  }, [isSuccess, data]);

  const handleUpdateFullnameUser = async () => {
    if (userId) {
      const result = await updateUserInfo(userId, userName, userPhone);
      if (result.errorMsg) {
        toaster.error({
          title: "Thông báo",
          description: result.errorMsg,
        });
      } else {
        toaster.success({
          title: "Cập nhật thành công",
          description: result.message,
        });
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <VStack alignItems="start">
      <DialogRoot>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            justifyContent={"start"}
            paddingInline={2}
            className="hover:bg-gray-200"
            w={"full"}
          >
            <FiInfo /> Thông tin
          </Button>
        </DialogTrigger>
        <DialogContent color={"white"}>
          <DialogHeader>
            <DialogTitle className="flex" alignItems={"center"} gap={2}>
              Thông tin tài khoản <FaPencilAlt />
            </DialogTitle>
          </DialogHeader>
          <DialogBody pb="8">
            <DataListRoot orientation="horizontal">
              <DataListItem
                label="Trạng thái"
                value={<Badge colorPalette="green">Completed</Badge>}
              />
              <DataListItem
                label="Tên người dùng"
                value={
                  <HStack>
                    <Avatar
                      size="xs"
                      name="Segun Adebayo"
                      src="https://bit.ly/sage-adebayo"
                    />

                    <Editable.Root
                      defaultValue={userName}
                      activationMode="dblclick"
                      onChange={(e) =>
                        setUserName((e.target as HTMLInputElement).value)
                      }
                    >
                      <Editable.Preview />
                      <Editable.Input />
                      <Editable.Control>
                        <Editable.EditTrigger asChild>
                          <IconButton variant="ghost" size="xs">
                            <LuPencilLine />
                          </IconButton>
                        </Editable.EditTrigger>
                        <Editable.CancelTrigger
                          asChild
                          onClick={() => console.log("cancel")}
                        >
                          <IconButton variant="outline" size="xs">
                            <LuX />
                          </IconButton>
                        </Editable.CancelTrigger>
                        <Editable.SubmitTrigger
                          asChild
                          onClick={handleUpdateFullnameUser}
                        >
                          <IconButton variant="outline" size="xs">
                            <LuCheck />
                          </IconButton>
                        </Editable.SubmitTrigger>
                      </Editable.Control>
                    </Editable.Root>
                  </HStack>
                }
              />
              <DataListItem label="Tài khoản" value={data[0]?.username} />

              <DataListItem label="Email" value={data[0]?.email} />

              <DataListItem
                label="Số điện thoại"
                value={
                  <Editable.Root
                    defaultValue={
                      data[0]?.phone_number ? String(userPhone) : ""
                    }
                    activationMode="dblclick"
                    onChange={(e) =>
                      setUserPhone((e.target as HTMLInputElement).value)
                    }
                  >
                    <Editable.Preview />
                    <Editable.Input />
                    <Editable.Control>
                      <Editable.EditTrigger asChild>
                        <IconButton variant="ghost" size="xs">
                          <LuPencilLine />
                        </IconButton>
                      </Editable.EditTrigger>
                      <Editable.CancelTrigger
                        asChild
                        onClick={() => console.log("cancel")}
                      >
                        <IconButton variant="outline" size="xs">
                          <LuX />
                        </IconButton>
                      </Editable.CancelTrigger>
                      <Editable.SubmitTrigger
                        asChild
                        onClick={handleUpdateFullnameUser}
                      >
                        <IconButton variant="outline" size="xs">
                          <LuCheck />
                        </IconButton>
                      </Editable.SubmitTrigger>
                    </Editable.Control>
                  </Editable.Root>
                }
              />

              <DataListItem
                label="Ngày tạo"
                value={dateFormat(data[0]?.createdAt)}
              />
            </DataListRoot>
          </DialogBody>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </VStack>
  );
};

export default UserInfomation;
