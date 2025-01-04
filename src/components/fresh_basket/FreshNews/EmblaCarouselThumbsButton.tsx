import { FreshNews } from "@/lib/stores/fresh-basket";
import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

type PropType = {
  selected: boolean;
  value: FreshNews;
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, value, onClick } = props;

  return (
    <div
      className={"embla-thumbs__slide embla-news-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number embla-news-thumbs__slide__number relative"
      >
        <Flex flexDir={"column"}>
          <Image src={value.image} objectFit={"cover"} />
          <Flex
            borderImage={"fill 0 linear-gradient(#0001, #000)"}
            position={"absolute"}
            bottom={0}
            left={0}
            right={0}
            className="embla-news-thumbs__slide__number__title"
            justifyContent={"center"}
            color={"#fff"}
          >
            <Text fontWeight={400} fontSize={15} padding={"10px"}>
              {value.title}
            </Text>
          </Flex>
        </Flex>
      </button>
    </div>
  );
};
