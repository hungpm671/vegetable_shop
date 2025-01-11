import React from "react";
import { Grid, GridItem, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { BiLaugh } from "react-icons/bi";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { getUserInfo } from "@/_action/userAction";
import { Tabs } from "@chakra-ui/react";

interface FormValues {
  username: string;
  password: string;
}
export default function FormRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (data) => {
    const user = await getUserInfo(data.username);
    if (user[0]) {
      await sessionStorage.setItem("userId", user[0]._id);
      window.location.href = `/`;
    } else {
      alert("Tài khoản hoặc mật khẩu không chính xác!");
    }
  });

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={2} h={"full"}>
      <GridItem
        className="flex"
        justifyContent={"center"}
        flexDir={"column"}
        alignItems={"center"}
        bg={"linear-gradient(170deg, #3b82f6, #2563eb)"}
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
          Come join us! <BiLaugh />
        </Heading>
        <Text textAlign={"center"}>
          We are so excited to have you here.If you have not already, create an
          account to get access to exclusive offers, rewards, and discounts.
        </Text>
        <Tabs.List
          bgColor={"#2563eb"}
          className="rounded-full"
          paddingInline={15}
          mt={15}
        >
          <Tabs.Trigger value={"signin"}>
            <IoArrowBackCircleSharp /> Already have an account? Signin.
          </Tabs.Trigger>
        </Tabs.List>
      </GridItem>

      <GridItem paddingInline={"15px"} paddingBlock={"50px 100px"}>
        <Heading
          className="flex"
          alignItems={"center"}
          justifyContent={"center"}
          fontWeight={700}
          fontSize={24}
          paddingBlock={10}
        >
          Đăng ký
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
                bgColor={"blue.600"}
                color={"white"}
                w={"full"}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Stack>
      </GridItem>
    </Grid>
  );
}
