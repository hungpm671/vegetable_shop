import React, { useState } from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Button,
  DialogActionTrigger,
  DialogFooter,
  Flex,
  Input,
  Table,
  Textarea,
} from "@chakra-ui/react";
import { useUsersStore } from "@/lib/stores/users";
import OrderInfomationItem from "./OrderInfomationItem";
import { Stack } from "@chakra-ui/react";
import TotalCart from "../../../../../utils/TotalCart";
import { orderByUser } from "@/_action/userAction";
import { toaster } from "@/components/ui/toaster";
import { Group } from "@chakra-ui/react";
import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "@/components/ui/radio-card";
import {
  FaAddressCard,
  FaRegCreditCard,
  FaRegMoneyBillAlt,
} from "react-icons/fa";

import { Fieldset } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import { useQuery } from "@tanstack/react-query";
import { SkeletonText } from "@/components/ui/skeleton";
import { Districts, Provinces, Ward } from "@/lib/type/provinces";

export default function OrderInformation({ userId }: { userId: string }) {
  const [codeProvince, setCodeProvince] = useState("");
  const [isDistrict, setIsDistrict] = useState(true);

  const [codeDistrict, setCodeDistrict] = useState("");
  const [isWard, setIsWard] = useState(true);

  const [codeWard, setCodeWard] = useState("");

  const [address, setAddress] = useState("");

  const [note, setNote] = useState("");

  const {
    cartUser,
    userName,
    userPhone,
    userEmail,
    setCartUser,
    setUserName,
    setUserPhone,
    setUserEmail,
  } = useUsersStore((state) => state);

  const { data: provinces = [], isLoading: isLoadingProvinces } = useQuery({
    queryKey: ["provinces"],
    queryFn: () =>
      fetch("https://provinces.open-api.vn/api/?depth=1").then((res) =>
        res.json()
      ),
  });

  const { data: district, isLoading: isLoadingDistrict } = useQuery({
    queryKey: ["district", codeProvince],
    queryFn: () =>
      fetch(`https://provinces.open-api.vn/api/p/${codeProvince}?depth=2`).then(
        (res) => res.json()
      ),
    enabled: !!codeProvince,
  });

  const { data: wards, isLoading: isLoadingWards } = useQuery({
    queryKey: ["wards", codeDistrict],
    queryFn: () =>
      fetch(`https://provinces.open-api.vn/api/d/${codeDistrict}?depth=2`).then(
        (res) => res.json()
      ),
    enabled: !!codeDistrict,
  });

  const handleOrder = async () => {
    const selectedProvince = provinces?.find(
      (item: Provinces) => item.code === Number(codeProvince)
    );
    const selectedDistrict = district.districts?.find(
      (item: Districts) => item.code === Number(codeDistrict)
    );
    const selectedWard = wards.wards?.find(
      (item: Ward) => item.code === Number(codeWard)
    );

    const informationOrder = {
      userId,
      cartUser,
      selectedProvince,
      selectedDistrict,
      selectedWard,
      address,
      userName,
      userPhone,
      userEmail,
      note,
    };

    if (userId) {
      const result = await orderByUser(informationOrder);

      if (result.errorMsg) {
        toaster.create({
          title: "Thất bại",
          type: "warning",
          description: `"Error adding product to cart:" ${result.errorMsg}`,
        });
        console.log(result.errorMsg);
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
    <DialogRoot scrollBehavior="inside" size="md">
      <DialogTrigger asChild>
        <Button
          bgColor={"green.500"}
          paddingInline={"10px"}
          color={"white"}
          fontWeight={700}
        >
          <TotalCart />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle color={"white"}>Thông tin hóa đơn</DialogTitle>
        </DialogHeader>

        <DialogCloseTrigger />

        <DialogBody>
          <Fieldset.Root size="lg" color={"white"}>
            <Stack>
              <Fieldset.Legend className="flex" alignItems={"center"} gap={3}>
                <FaAddressCard size={24} /> Thông tin mua hàng
              </Fieldset.Legend>
              <Fieldset.HelperText>
                Vui lòng cung cấp thông tin mua hàng bên dưới
              </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
              <Input
                name="email"
                type="email"
                placeholder="Email (tùy chọn)"
                variant={"subtle"}
                onChange={(e) =>
                  setUserEmail((e.target as HTMLInputElement).value)
                }
              />

              <Input
                name="name"
                type="text"
                placeholder="Họ và tên"
                variant={"subtle"}
                onChange={(e) =>
                  setUserName((e.target as HTMLInputElement).value)
                }
              />

              <Input
                name="phone_number"
                type="number"
                placeholder="Số điện thoại"
                variant={"subtle"}
                className="appearance-none [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden [&::-moz-appearance:textfield]"
                onChange={(e) =>
                  setUserPhone((e.target as HTMLInputElement).value)
                }
              />

              <Field label="Tỉnh thành">
                {isLoadingProvinces ? (
                  <SkeletonText noOfLines={1} />
                ) : (
                  <NativeSelectRoot variant={"subtle"}>
                    <NativeSelectField
                      placeholder="Tỉnh/Thành phố"
                      value={codeProvince}
                      onChange={(e) => {
                        setCodeProvince(e.currentTarget.value);
                        setIsDistrict(false);
                      }}
                    >
                      {provinces?.map((item: Provinces) => (
                        <option key={item.code} value={item.code}>
                          {item.name}
                        </option>
                      ))}
                    </NativeSelectField>
                  </NativeSelectRoot>
                )}
              </Field>

              <Field label="Quận huyện" disabled={isDistrict}>
                {isLoadingDistrict ? (
                  <SkeletonText noOfLines={1} />
                ) : (
                  <NativeSelectRoot variant={"subtle"}>
                    <NativeSelectField
                      placeholder="Quận/Huyện"
                      value={codeDistrict}
                      onChange={(e) => {
                        setCodeDistrict(e.currentTarget.value);
                        setIsWard(false);
                      }}
                    >
                      {!isDistrict &&
                        district.districts?.map((item: Districts) => (
                          <option key={item.code} value={item.code}>
                            {item.name}
                          </option>
                        ))}
                    </NativeSelectField>
                  </NativeSelectRoot>
                )}
              </Field>

              <Field label="Phường xã" disabled={isWard}>
                {isLoadingWards ? (
                  <SkeletonText noOfLines={1} />
                ) : (
                  <NativeSelectRoot variant={"subtle"}>
                    <NativeSelectField
                      placeholder="Phường/Xã"
                      value={codeWard}
                      onChange={(e) => {
                        setCodeWard(e.currentTarget.value);
                      }}
                    >
                      {!isWard &&
                        wards.wards?.map((item: Ward) => (
                          <option key={item.code} value={item.code}>
                            {item.name}
                          </option>
                        ))}
                    </NativeSelectField>
                  </NativeSelectRoot>
                )}
              </Field>

              <Input
                name="addess"
                placeholder="Địa chỉ"
                variant={"subtle"}
                onChange={(e) => {
                  setAddress(e.currentTarget.value);
                }}
              />

              <Field
                label="Ghi chú"
                required
                helperText="Max 500 characters."
                maxH={"150px"}
              >
                <Textarea
                  placeholder="Ghi chú..."
                  variant="subtle"
                  defaultValue={note}
                  onChange={(e) =>
                    setNote((e.target as HTMLTextAreaElement).value)
                  }
                />
              </Field>
            </Fieldset.Content>
          </Fieldset.Root>

          <Table.Root size="md" interactive mt={"15px"}>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader fontWeight={600}>
                  Sản phẩm
                </Table.ColumnHeader>
                <Table.ColumnHeader fontWeight={600} textAlign="center">
                  Loại
                </Table.ColumnHeader>
                <Table.ColumnHeader fontWeight={600} textAlign="center">
                  Số lượng
                </Table.ColumnHeader>
                <Table.ColumnHeader fontWeight={600} textAlign="end">
                  Tổng
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {cartUser.map((value, index) => (
                <OrderInfomationItem key={index} value={value} />
              ))}
            </Table.Body>
          </Table.Root>

          <RadioCardRoot defaultValue="cod" gap="4" color={"white"} mt={"15px"}>
            <RadioCardLabel>Phương thức thanh toán</RadioCardLabel>
            <Group attached orientation="vertical">
              {items.map((item) => (
                <RadioCardItem
                  width="full"
                  indicatorPlacement="start"
                  label={item.title}
                  key={item.value}
                  value={item.value}
                  disabled={item.isDisabled}
                />
              ))}
            </Group>
          </RadioCardRoot>
        </DialogBody>

        <DialogFooter>
          <Button
            bgColor={"green.500"}
            paddingInline={"10px"}
            color={"white"}
            fontWeight={700}
            onClick={handleOrder}
          >
            <TotalCart />
          </Button>
          <DialogActionTrigger
            asChild
            bgColor={"red.600"}
            color={"white"}
            paddingInline={"10px"}
          >
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
        </DialogFooter>

        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

const items = [
  {
    value: "cod",
    title: (
      <Flex alignItems={"center"} gap={3}>
        <FaRegMoneyBillAlt size={24} color={"orange"} />
        Thanh toán khi nhận hàng
      </Flex>
    ),
    isDisabled: false,
  },
  {
    value: "credit",
    title: (
      <Flex alignItems={"center"} gap={3}>
        <FaRegCreditCard size={24} color={"orange"} />
        Chuyển khoản ngân hàng
      </Flex>
    ),
    isDisabled: true,
  },
];
