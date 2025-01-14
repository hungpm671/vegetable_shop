import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import { VegetableFruit } from "@/lib/type/vegetable_fruit";
import { Flex } from "@chakra-ui/react";
import ProductSaleItem from "./ProductSaleItem";

type PropType = {
  slides: VegetableFruit[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla-product_sale">
      <div className="embla__viewport-product-sale" ref={emblaRef}>
        <div className="embla__container-product-sale">
          {slides
            .filter((value) => value.discount > 0)
            ?.map((value, index) => (
              <ProductSaleItem key={index} value={value} />
            ))}
        </div>
      </div>

      <div className="embla__controls-product_sale">
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          className="embla__buttons-product_sale"
        >
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </Flex>
      </div>
    </section>
  );
};

export default EmblaCarousel;
