import FreshProductSearch from "@/components/fresh_basket-search/FreshProductSearch";
import { Box } from "@chakra-ui/react";
import React from "react";

export default function Search() {
  return (
    <Box className="mx-auto max-w-7xl" mt={"64px"} mb={50}>
      <FreshProductSearch />
    </Box>
  );
}
