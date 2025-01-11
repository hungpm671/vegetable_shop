import FreshCarousel from "@/components/fresh_basket-home/FreshCarouselBanner/FreshCarousel";
import FreshIntro from "@/components/fresh_basket-home/FreshIntro/FreshIntro";
import { Flex } from "@chakra-ui/react";
import FreshProductSuggestions from "@/components/fresh_basket-home/FreshProductSuggestions/FreshProductSuggestions";
import FreshIntro_2 from "@/components/fresh_basket-home/FreshIntro/FreshIntro_2";
import FreshNews from "@/components/fresh_basket-home/FreshNews/FreshNews";
import { FreshPaginationFeedback } from "../FreshPaginationFeedback.tsx/FreshPaginationFeedback";
import ProductSale from "../FreshProductSale/ProductSale";

export default function FreshHomePage() {
  return (
    <>
      <FreshCarousel />
      <Flex className="mx-auto max-w-7xl" flexDir={"column"}>
        <FreshIntro />
        <FreshProductSuggestions />
        <ProductSale title="Sản phẩm đang khuyến mãi" />
      </Flex>
      <FreshIntro_2 />
      <FreshNews />
      <FreshPaginationFeedback itemsPerPage={3} />
    </>
  );
}
