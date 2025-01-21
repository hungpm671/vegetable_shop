"use client";

import React, { useCallback, useEffect, useRef } from "react";
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Autoplay from "embla-carousel-autoplay";
import "./embla.css";

const TWEEN_FACTOR_BASE = 0.2;

type PropType = {
  slides: SlidesProp[];
  options?: EmblaOptionsType;
};

export type SlidesProp = {
  thumb: string;
  title: string;
  description: string;
};
const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 5000 }),
  ]);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__parallax__layer") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenParallax = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
          const tweenNode = tweenNodes.current[slideIndex];
          tweenNode.style.transform = `translateX(${translate}%)`;
        });
      });
    },
    []
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenParallax(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenParallax)
      .on("scroll", tweenParallax)
      .on("slideFocus", tweenParallax);
  }, [emblaApi, tweenParallax, setTweenNodes, setTweenFactor]);

  return (
    <Box className="embla" position={"relative"}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((value, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__parallax">
                <Box className="embla__parallax__layer" position={"relative"}>
                  <Image
                    className="embla__slide__img embla__parallax__img"
                    src={value.thumb}
                    alt="Your alt text"
                    objectFit={"cover"}
                  />
                  <Flex
                    flexDir={"column"}
                    alignItems={"center"}
                    gap={{ base: 5, sm: 10 }}
                    position={"absolute"}
                    top={"30%"}
                    left={"50%"}
                    translate={"-50%"}
                    color={"#ffffff"}
                    w={"full"}
                    paddingInline={{ base: 5, md: 10, lg: "60px", xl: "100px" }}
                  >
                    <Heading
                      as={"h1"}
                      fontSize={{ base: 24, md: 36, lg: 45 }}
                      textAlign={"center"}
                      lineHeight={1.2}
                      fontWeight={600}
                    >
                      {value.title}
                    </Heading>
                    <Text textAlign={"center"}>{value.description}</Text>
                  </Flex>
                </Box>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Flex
        className="embla__buttons"
        alignItems={"center"}
        justifyContent={"space-between"}
        position={"absolute"}
        top={"50%"}
        right={0}
        left={0}
      >
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </Flex>

      <Flex
        className="embla__dots"
        alignItems={"center"}
        justifyContent={"center"}
        position={"absolute"}
        bottom={5}
        left={0}
        right={0}
      >
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={"embla__dot".concat(
              index === selectedIndex ? " embla__dot--selected" : ""
            )}
          />
        ))}
      </Flex>

      {/* <div className="embla__controls"></div> */}
    </Box>
  );
};

export default EmblaCarousel;
