import React from "react";
import { Grid, GridItem, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { BiLaugh } from "react-icons/bi";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form";
import { IoArrowForwardCircle } from "react-icons/io5";
import { checkUserInfo } from "@/_action/userAction";
import { Tabs } from "@chakra-ui/react";

interface FormValues {
  username: string;
  password: string;
}

export default function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (data) => {
    const user = await checkUserInfo(data.username);
    if (user[0]) {
      await sessionStorage.setItem("userId", user[0]._id);
      window.location.href = `/`;
    } else {
      alert("Tài khoản hoặc mật khẩu không chính xác!");
    }
  });
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={2} h={"full"}>
      <GridItem paddingInline={"15px"} paddingBlock={"50px 100px"}>
        <Heading
          className="flex"
          alignItems={"center"}
          justifyContent={"center"}
          fontWeight={700}
          fontSize={24}
          paddingBlock={10}
        >
          Đăng nhập
        </Heading>
        <Stack gap="4">
          <form onSubmit={onSubmit}>
            <Stack gap="4" align="flex-start">
              <Field
                invalid={!!errors.username}
                errorText={errors.username?.message}
              >
                <Input
                  bgColor={"gray.200"}
                  paddingInline={"10px"}
                  placeholder="Tài khoản"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
              </Field>

              <Field
                invalid={!!errors.password}
                errorText={errors.password?.message}
              >
                <PasswordInput
                  bgColor={"gray.200"}
                  paddingInline={"10px"}
                  placeholder="Mật khẩu"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </Field>

              <Button
                type="submit"
                bgColor={"green.600"}
                color={"white"}
                w={"full"}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Stack>
      </GridItem>

      <GridItem
        className="flex"
        justifyContent={"center"}
        flexDir={"column"}
        alignItems={"center"}
        bg={"linear-gradient(170deg, #34d399, #059669)"}
        color={"white"}
        paddingInline={"15px"}
      >
        <Heading
          fontWeight={700}
          fontSize={20}
          className="flex"
          alignItems={"center"}
          gap={1}
        >
          Wellcom back! <BiLaugh />
        </Heading>
        <Text textAlign={"center"}>
          Welcome back! We are so happy to have you here. It is great to see you
          again. We hope you had a safe and enjoyable time away.
        </Text>
        <Tabs.List
          bgColor={"#059669"}
          className="rounded-full"
          paddingInline={15}
          mt={15}
          textDecor={"none"}
        >
          <Tabs.Trigger value={"signup"}>
            No account yet? Signup. <IoArrowForwardCircle />
          </Tabs.Trigger>
        </Tabs.List>
      </GridItem>
    </Grid>
  );
}
