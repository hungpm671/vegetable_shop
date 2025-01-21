import { useFreshBasketStore } from "@/lib/stores/fresh-basket";
import { VegetableFruit } from "@/lib/type/vegetable_fruit";
import { Grid } from "@chakra-ui/react";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { ProductItem } from "./ProductItem";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import "./style.css";

function Items({ currentItems }: { currentItems: VegetableFruit[] }) {
  return (
    <Grid
      templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
      gap={3}
    >
      {currentItems?.map((value: VegetableFruit, index: number) => (
        <ProductItem key={index} value={value} />
      ))}
    </Grid>
  );
}

export default function ProductPaginatedItems({
  itemsPerPage,
}: {
  itemsPerPage: number;
}) {
  const { filterVegetableFruits: items } = useFreshBasketStore(
    (state) => state
  );
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel={<GrFormNext />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<GrFormPrevious />}
        renderOnZeroPageCount={null}
        className="flex gap-4 items-center justify-center pagination-feedback mt-3"
        pageClassName="pagination-feedback-item flex rounded-full"
      />
    </>
  );
}
