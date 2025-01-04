import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumbsButton";
import { Grid, GridItem, Heading, Image, Text } from "@chakra-ui/react";
import { FreshNews } from "@/lib/stores/fresh-basket";

type PropType = {
  slides: FreshNews[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla embla-news">
      <div className="embla__viewport embla-news__viewport" ref={emblaMainRef}>
        <div className="embla__container embla-news__container">
          {slides.map((value, index) => (
            <div className="embla__slide embla-news__slide" key={index}>
              <div className="embla__slide__number embla-news__slide__number">
                <Grid templateColumns="repeat(2, 1fr)" gap="3">
                  <GridItem className="flex" justifyContent={"center"}>
                    <Image src={value.image} objectFit={"cover"} />
                  </GridItem>
                  <GridItem
                    className="flex"
                    justifyContent={"center"}
                    flexDir={"column"}
                  >
                    <Heading as={"h5"} fontSize={20} fontWeight={700}>
                      {value.title}
                    </Heading>
                    <Text fontSize={12} fontWeight={400}>
                      {value.description}
                    </Text>
                  </GridItem>
                </Grid>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs embla-news-thumbs">
        <div
          className="embla-thumbs__viewport embla-news-thumbs__viewport"
          ref={emblaThumbsRef}
        >
          <div className="embla-thumbs__container embla-news-thumbs__container">
            {slides.map((value, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                value={value}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
