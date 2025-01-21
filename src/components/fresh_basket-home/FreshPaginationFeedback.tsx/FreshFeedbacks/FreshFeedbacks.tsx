import { Flex } from "@chakra-ui/react";
import React from "react";
import { FreshFeedbackItem } from "./FreshFeedbackItem";
import { FeedbackProp } from "@/lib/stores/fresh-basket";

export default function FreshFeedbacks({
  currentItems,
}: {
  currentItems: FeedbackProp[];
}) {
  return (
    <Flex marginBlock={50} gap={3}>
      {currentItems.map((value, index) => (
        <FreshFeedbackItem key={index} value={value} />
      ))}
    </Flex>
  );
}
