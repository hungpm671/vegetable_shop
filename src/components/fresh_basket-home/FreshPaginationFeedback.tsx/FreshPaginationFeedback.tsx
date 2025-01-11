"use client";

import { useFreshBasketStore } from "@/lib/stores/fresh-basket";
import { Flex, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import ReactPaginate from "react-paginate";
import FreshFeedbacks from "./FreshFeedbacks/FreshFeedbacks";
import "./style.css";

export function FreshPaginationFeedback({
  itemsPerPage,
}: {
  itemsPerPage: number;
}) {
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
    <Flex flexDir={"column"} alignItems={"center"} marginBlock={50}>
      <Heading as={"h1"} fontSize={48} textAlign={"center"} fontWeight={700}>
        Feedback
      </Heading>
      <FreshFeedbacks currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel={<GrFormNext />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<GrFormPrevious />}
        renderOnZeroPageCount={null}
        className="flex gap-4 items-center pagination-feedback"
        pageClassName="pagination-feedback-item flex"
      />
    </Flex>
  );
}
