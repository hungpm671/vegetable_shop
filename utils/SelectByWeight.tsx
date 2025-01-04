"use client";

import { For, Stack, createListCollection } from "@chakra-ui/react";
import {
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectLabel,
} from "@/components/ui/select";

import { SelectContent, SelectItem } from "@chakra-ui/react";

const SelectByWeight = () => {
  return (
    <Stack gap="5" width="320px">
      <For each={["xs", "sm", "md", "lg"]}>
        {(size) => (
          <SelectRoot key={size} size={size} collection={frameworks}>
            <SelectLabel>size = {size}</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder="Select movie" />
            </SelectTrigger>
            <SelectContent>
              {frameworks.items.map((movie) => (
                <SelectItem item={movie} key={movie.value}>
                  {movie.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        )}
      </For>
    </Stack>
  );
};

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
});

export default SelectByWeight;
