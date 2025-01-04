import { Button, Card, Flex, GridItem, Image, Text } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { TiShoppingCart } from "react-icons/ti";
import { FaHeart } from "react-icons/fa6";
import { FaHeartBroken } from "react-icons/fa";
import { MdOutlineComment } from "react-icons/md";
import Link from "next/link";
import { VegetableFruit } from "@/lib/type/vegetable_fruit";

export const ProductItem = ({ value }: { value: VegetableFruit }) => {
  return (
    <GridItem>
      <Tooltip
        content={value.description}
        positioning={{ placement: "bottom" }}
      >
        <Card.Root
          maxW="sm"
          overflow="hidden"
          background={"#fff"}
          color={"#000"}
          className="border shadow-md"
        >
          <Link href={`/fresh-products/${value._id}`}>
            <Flex padding={"10px"}>
              <Image
                src={value.image}
                alt={value.name}
                objectFit={"cover"}
                h={"200px"}
                flex={1}
              />
            </Flex>
          </Link>
          <Card.Body
            gap="2"
            flexDir={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Card.Title textTransform={"capitalize"} fontWeight={700}>
              {value.name}
            </Card.Title>
            <Text textStyle="sm" fontWeight="medium" letterSpacing="tight">
              {value.price_per_kg}₫
            </Text>
          </Card.Body>
          <Card.Footer
            gap="2"
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Flex fontSize={12} gap={2} color={"gray.500"}>
              <Flex
                alignItems={"center"}
                gap={1}
                cursor={"pointer"}
                className="hover:text-red-600"
              >
                <FaHeart className="size-3" /> 1,999
              </Flex>

              <Flex
                alignItems={"center"}
                gap={1}
                cursor={"pointer"}
                className="hover:text-red-600"
              >
                <MdOutlineComment className="size-3" /> 3
              </Flex>
            </Flex>
            <Button
              variant="ghost"
              className=" rounded-full hover:bg-green-600 hover:text-white"
            >
              <TiShoppingCart aria-hidden="true" className="size-6" />
            </Button>
          </Card.Footer>
        </Card.Root>
      </Tooltip>
    </GridItem>
  );
};
