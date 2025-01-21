import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import { VegetableFruit } from "@/lib/type/vegetable_fruit";
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
    <section className="embla_product-sale max-w-7xl relative mb-5 mx-5 md:mx-10 xl:mx-auto">
      <div className="embla__viewport_product-sale" ref={emblaRef}>
        <div className="embla__container_product-sale">
          {slides
            .filter((value) => value.discount > 0)
            ?.map((value, index) => (
              <ProductSaleItem key={index} value={value} />
            ))}
        </div>
      </div>

      <div className="embla__controls_product-sale">
        <div className="embla__buttons_product-sale">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
