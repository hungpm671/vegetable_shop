import React, { useState } from "react";
import { Grid, GridItem, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { BiLaugh } from "react-icons/bi";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Tabs } from "@chakra-ui/react";
import { registerUser } from "@/_action/userAction";
import { toaster } from "@/components/ui/toaster";

interface FormValues {
  username: string;
  email: string;
  password: string;
  re_password: string;
}
export default function FormRegister() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async () => {
    if (password !== repassword) {
      alert("Mật khẩu không trùng khớp!");
      return;
    }

    const result = await registerUser(username, email, password);
    if (result.errorMsg) {
      toaster.error({
        title: "Thông báo",
        description: result.errorMsg,
      });
    } else {
      toaster.success({
        title: "Đăng ký thành công",
        description: result.message,
      });
      window.location.href = `/`;
    }
  });

  return (
    <Grid
      templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }}
      gap={2}
      h={"full"}
    >
      <GridItem
        className="flex"
        justifyContent={"center"}
        flexDir={"column"}
        alignItems={"center"}
        bg={"linear-gradient(170deg, #3b82f6, #2563eb)"}
        color={"white"}
        paddingInline={"15px"}
        display={{ base: "none", sm: "flex" }}
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

      <GridItem
        paddingInline={"15px"}
        className="flex"
        flexDir={"column"}
        justifyContent={"center"}
      >
        <Heading
          className="flex"
          alignItems={"center"}
          justifyContent={"center"}
          fontWeight={700}
          fontSize={24}
          paddingBlock={5}
        >
          Đăng ký
        </Heading>
        <Stack gap="4">
          <form onSubmit={onSubmit}>
            <Stack gap="4" align="flex-start">
              {/* username */}
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
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message: "Username must not contain special characters",
                    },
                  })}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Field>

              {/* email */}
              <Field invalid={!!errors.email} errorText={errors.email?.message}>
                <Input
                  bgColor={"gray.200"}
                  paddingInline={"10px"}
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>

              {/* password */}
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
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                      message:
                        "Password must be at least 6 characters, include 1 uppercase letter, 1 number, and 1 special character",
                    },
                  })}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>

              {/* Re-enter password */}
              <Field
                invalid={!!errors.re_password}
                errorText={errors.re_password?.message}
              >
                <PasswordInput
                  bgColor={"gray.200"}
                  paddingInline={"10px"}
                  placeholder="Nhập lại mật khẩu"
                  {...register("re_password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                      message:
                        "Password must be at least 6 characters, include 1 uppercase letter, 1 number, and 1 special character",
                    },
                  })}
                  onChange={(e) => setRepassword(e.target.value)}
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
