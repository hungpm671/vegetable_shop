import { Flex, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { FreshFeedbackItem } from "./FreshFeedbackItem";
import { FeedbackProp } from "@/lib/stores/fresh-basket";

export default function FreshFeedbacks({
  currentItems,
}: {
  currentItems: FeedbackProp[];
}) {
  return (
    <Flex flexDir={"column"} className="mx-auto max-w-7xl" marginBlock={50}>
      <Grid templateColumns="1fr 1fr 1fr" gap={4}>
        {currentItems.map((value, index) => (
          <GridItem
            className="flex"
            key={index}
            boxShadow={"sm"}
            padding={"20px 30px"}
            borderRadius={"sm"}
          >
            <FreshFeedbackItem value={value} />
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
}
