import { InputGroup } from "@/components/ui/input-group";
import { useFreshBasketStore } from "@/lib/stores/fresh-basket";
import { Input } from "@chakra-ui/react";
import React from "react";
import { LuSearch } from "react-icons/lu";

export default function ProductSearchInput() {
  const { inputValueSearch, setInputValueSearch } = useFreshBasketStore(
    (state) => state
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const value = (event.target as HTMLInputElement).value;
    if (event.key === "Enter") {
      window.location.href = `/search?search_query=${value}`;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValueSearch(value);

    const searchResult = document.querySelector(
      ".search_result"
    ) as HTMLElement;
    if (searchResult) {
      if (value.length > 0) {
        searchResult.style.setProperty("display", "flex", "important");
      } else {
        searchResult.style.setProperty("display", "none", "important");
      }
    }
  };

  return (
    <InputGroup
      flex="1"
      startElement={<LuSearch />}
      border={"1px solid #ccc"}
      borderRadius={"4px"}
      onKeyDown={(e) => handleKeyDown(e)}
      onChange={handleChange}
    >
      <Input placeholder="Search..." defaultValue={inputValueSearch} />
    </InputGroup>
  );
}
