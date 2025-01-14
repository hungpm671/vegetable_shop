"use client";

import { Button } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

export const ToatMessage = () => {
  return toaster.success({
    title: "Update successful",
    description: "File saved successfully to the server",
    action: {
      label: "Undo",
      onClick: () => console.log("Undo"),
    },
  });
};
