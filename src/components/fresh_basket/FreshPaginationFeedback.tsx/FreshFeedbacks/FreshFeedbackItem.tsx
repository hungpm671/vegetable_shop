import { HStack, Stack, Text } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Rating } from "@/components/ui/rating";
import { FeedbackProp } from "@/lib/stores/fresh-basket";

export const FreshFeedbackItem = ({ value }: { value: FeedbackProp }) => {
  return (
    <Stack maxW="520px" gap="4">
      <Rating colorPalette="orange" readOnly size="xs" defaultValue={5} />

      <Text>{value.content}</Text>

      <HStack gap="4">
        <Avatar
          name="Matthew Jones"
          src="https://randomuser.me/api/portraits/men/70.jpg"
        />
        <Stack textStyle="sm" gap="0">
          <Text fontWeight="medium">{value.name}</Text>
          <Text color="fg.muted">{value.email}</Text>
        </Stack>
      </HStack>
    </Stack>
  );
};
