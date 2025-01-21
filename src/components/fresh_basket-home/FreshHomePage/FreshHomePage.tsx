import FreshCarousel from "@/components/fresh_basket-home/FreshCarouselBanner/FreshCarousel";
import FreshIntro from "@/components/fresh_basket-home/FreshIntro/FreshIntro";
import FreshProductSuggestions from "@/components/fresh_basket-home/FreshProductSuggestions/FreshProductSuggestions";
import FreshIntro_2 from "@/components/fresh_basket-home/FreshIntro/FreshIntro_2";
import FreshNews from "@/components/fresh_basket-home/FreshNews/FreshNews";
import { FreshPaginationFeedback } from "../FreshPaginationFeedback.tsx/FreshPaginationFeedback";
import ProductSale from "../FreshProductSale/ProductSale";

export default function FreshHomePage() {
  return (
    <>
      <FreshCarousel />
      <FreshIntro />
      <FreshProductSuggestions />
      <ProductSale />
      <FreshIntro_2 />
      <FreshNews />
      <FreshPaginationFeedback />
    </>
  );
}
