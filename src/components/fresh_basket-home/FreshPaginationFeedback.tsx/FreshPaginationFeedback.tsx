"use client";

import { useFreshBasketStore } from "@/lib/stores/fresh-basket";
import { Flex, Heading, useBreakpointValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import ReactPaginate from "react-paginate";
import FreshFeedbacks from "./FreshFeedbacks/FreshFeedbacks";
import "./style.css";

export function FreshPaginationFeedback() {
  const itemsPerPage =
    useBreakpointValue({
      base: 1,
      md: 2,
      lg: 3,
      xl: 4,
    }) || 1;

  const { feedback: items } = useFreshBasketStore((state) => state);
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <Flex
      className="max-w-7xl"
      flexDir={"column"}
      alignItems={"center"}
      marginBlock={50}
      marginInline={{ base: 5, md: 10, xl: "auto" }}
    >
      <Heading as={"h1"} fontSize={48} textAlign={"center"} fontWeight={700}>
        Feedback
      </Heading>
      <FreshFeedbacks currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel={<GrFormNext />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={0}
        pageCount={pageCount}
        previousLabel={<GrFormPrevious />}
        renderOnZeroPageCount={null}
        className="flex gap-4 items-center pagination-feedback"
        pageClassName="pagination-feedback-item flex"
      />
    </Flex>
  );
}
