import { useFreshBasketStore } from "@/lib/stores/fresh-basket";
import { Box } from "@chakra-ui/react";
import React from "react";

export default function SuggestionSelected() {
  const { setType } = useFreshBasketStore((state) => state);

  const handleActiveTitle = (
    e: React.MouseEvent<HTMLElement>,
    value: string = "fruit"
  ): void => {
    const target = e.target as HTMLElement;
    const activeTitle = document.querySelector(".active-title") as HTMLElement;

    activeTitle?.classList.remove("active-title");

    target.classList.add("active-title");
    setType(value);
  };
  return (
    <Box
      as="ul"
      className="flex"
      listStyleType="none"
      alignItems={"center"}
      gap={6}
    >
      <li
        className="product_suggestion-title active-title text-center"
        onClick={(e) => handleActiveTitle(e, "fruit")}
      >
        Hoa quả
      </li>
      <li
        className="product_suggestion-title text-center"
        onClick={(e) => handleActiveTitle(e, "dry_food")}
      >
        Thực phẩm khô
      </li>
      <li
        className="product_suggestion-title text-center"
        onClick={(e) => handleActiveTitle(e, "vegetable")}
      >
        Rau củ tươi
      </li>
    </Box>
  );
}
