import { FreshNews } from "@/lib/stores/fresh-basket";
import { Image } from "@chakra-ui/react";
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
      className={"embla-thumbs__slide_news".concat(
        selected ? " embla-thumbs__slide_news--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number_news"
      >
        <Image src={value.image} alt={value.title} objectFit={"cover"} />
      </button>
    </div>
  );
};
