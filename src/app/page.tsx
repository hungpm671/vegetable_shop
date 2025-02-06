import { Box } from "@chakra-ui/react";
import FreshHomePage from "@/components/fresh_basket-home/FreshHomePage/FreshHomePage";
import { roboto } from "@/fonts/Roboto";

export default function Home() {
  return (
    <Box className={roboto.className}>
      <FreshHomePage />
    </Box>
  );
}
