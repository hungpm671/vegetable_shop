import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumbsButton";
import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
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
    <div className="embla_news max-w-7xl mb-[50px] mx-5 md:mx-10 xl:mx-auto">
      <div className="embla__viewport_news" ref={emblaMainRef}>
        <div className="embla__container_news">
          {slides.map((value, index) => (
            <div className="embla__slide_news" key={index}>
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}>
                <GridItem>
                  <Flex className="embla__slide__number_news relative">
                    <Image
                      src={value.image}
                      alt={value.title}
                      objectFit={"cover"}
                    />

                    <Box
                      position={"absolute"}
                      right={0}
                      left={0}
                      bottom={0}
                      color={"white"}
                      padding={"5px"}
                      borderImage={"fill 0 linear-gradient(#0001, #000)"}
                      flexDir={"column"}
                      display={{ base: "flex", md: "none" }}
                    >
                      <Text fontSize={{ base: 12, sm: 16 }}>{value.title}</Text>
                      <Text fontSize={{ base: 12, sm: 14 }} fontWeight={400}>
                        {value.description}
                      </Text>
                    </Box>
                  </Flex>
                </GridItem>

                <GridItem
                  padding={5}
                  display={{ base: "none", md: "flex" }}
                  flexDir={"column"}
                  justifyContent={"center"}
                >
                  <Text fontSize={{ base: 16, lg: 24 }} fontWeight={600}>
                    {value.title}
                  </Text>
                  <Text fontSize={{ base: 14 }} fontWeight={400}>
                    {value.description}
                  </Text>
                </GridItem>
              </Grid>
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs_news">
        <div className="embla-thumbs__viewport_news" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container_news">
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
