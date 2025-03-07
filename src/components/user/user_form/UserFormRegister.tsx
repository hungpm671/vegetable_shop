import { Button } from "@/components/ui/button";
import {
  DialogBody,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef } from "react";
import { Box, Tabs } from "@chakra-ui/react";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";

import { RiRegisteredLine } from "react-icons/ri";

const UserFormRegister = () => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <DialogRoot
      initialFocusEl={() => ref.current}
      placement={"center"}
      size={"lg"}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          justifyContent={"start"}
          paddingInline={2}
          className="hover:bg-gray-200"
        >
          <RiRegisteredLine /> Đăng ký
        </Button>
      </DialogTrigger>
      <DialogContent bgColor={"white"} overflow={"hidden"}>
        <DialogBody p={0} className="flex">
          <Tabs.Root defaultValue="signup" width="full">
            <Box pos="relative" minH="450px" width="full">
              <Tabs.Content
                value="signup"
                position="absolute"
                padding={0}
                inset="0"
                _open={{
                  animationName: "fade-in, scale-in",
                  animationDuration: "300ms",
                }}
                _closed={{
                  animationName: "fade-out, scale-out",
                  animationDuration: "120ms",
                }}
              >
                <FormRegister />
              </Tabs.Content>

              <Tabs.Content
                value="signin"
                position="absolute"
                padding={0}
                inset="0"
                _open={{
                  animationName: "fade-in, scale-in",
                  animationDuration: "300ms",
                }}
                _closed={{
                  animationName: "fade-out, scale-out",
                  animationDuration: "120ms",
                }}
              >
                <FormLogin />
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default UserFormRegister;
