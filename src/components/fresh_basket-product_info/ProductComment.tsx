import React from "react";
import { Card, HStack, Stack, Text } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Comments } from "@/lib/type/vegetable_fruit";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/_action/userAction";
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton";

export default function ProductComment({ value }: { value: Comments }) {
  const author = value.author.toString();

  const { data, isLoading } = useQuery({
    queryKey: ["author", author],
    queryFn: async () => await getUserInfo(author!),
  });

  if (isLoading) {
    return (
      <HStack gap="5">
        <SkeletonCircle size="12" />
        <Stack flex="1">
          <Skeleton height="5" />
          <Skeleton height="5" width="80%" />
        </Stack>
      </HStack>
    );
  }

  return (
    <Card.Root className="shadow-lg">
      <Card.Body bgColor={"white"}>
        <HStack mb="2" gap="3">
          <Avatar src={data[0]?.avatar_url} name={data[0]?.username} />
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm" color={"black"}>
              {data[0]?.username}
            </Text>
            <Text color="fg.muted" textStyle="sm">
              {data[0]?.email}
            </Text>
          </Stack>
        </HStack>
        <Card.Description>{value.content}</Card.Description>
      </Card.Body>
    </Card.Root>
  );
}
