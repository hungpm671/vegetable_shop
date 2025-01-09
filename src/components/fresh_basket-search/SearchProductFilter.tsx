"use client";

import { Stack } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";
import { useFreshBasketStore } from "@/lib/stores/fresh-basket";

const FreshProductFilter = () => {
  const {
    vegetables_fruits,
    filterSearchType,
    setFilterSearchType,
    setFilterConditions,
    setFilterArrayConditions,
    setFilterAllSearchType,
    setFilterAllArrayConditions,
  } = useFreshBasketStore((state) => state);

  const allChecked = filterSearchType.every((value) => value.checked);
  const indeterminate =
    filterSearchType.some((value) => value.checked) && !allChecked;

  const items = filterSearchType.map((item, index) => (
    <Checkbox
      ms="6"
      key={item.value}
      checked={item.checked}
      colorPalette={"black"}
      variant={"subtle"}
      onCheckedChange={(e) => {
        setFilterSearchType(index, !!e.checked);
        setFilterArrayConditions(item.value, !!e.checked);
        setFilterConditions(vegetables_fruits);
      }}
    >
      {item.label}
    </Checkbox>
  ));

  return (
    <Stack
      align="flex-start"
      position={"absolute"}
      top={"50px"}
      right={0}
      bg={"white"}
      className="search_filter shadow-md border"
      zIndex={1}
      w={200}
      padding={"5px 10px"}
      display={"none"}
    >
      <Checkbox
        colorPalette={"black"}
        variant={"subtle"}
        checked={indeterminate ? "indeterminate" : allChecked}
        onCheckedChange={(e) => {
          setFilterAllSearchType(!!e.checked);
          setFilterAllArrayConditions(!!e.checked);
          setFilterConditions(vegetables_fruits);
        }}
      >
        Tất cả
      </Checkbox>
      {items}
    </Stack>
  );
};

export default FreshProductFilter;
