import { Button, Card, Flex, GridItem, Image, Text } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { TiShoppingCart } from "react-icons/ti";
import { FaHeart } from "react-icons/fa6";
import { MdOutlineComment } from "react-icons/md";
import Link from "next/link";
import { VegetableFruit } from "@/lib/type/vegetable_fruit";
import CalculateSalePrice from "../../../../utils/CalculateSalePrice";
import { CalculateWeightPrice } from "../../../../utils/CalculateWeightPrice";

export const ProductItem = ({ value }: { value: VegetableFruit }) => {
  const handleLink = () => {
    window.location.href = `/fresh-products/${value._id}`;
  };

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
            <Flex
              padding={{ base: "8px", sm: "10px", md: "15px", lg: "24px" }}
              justifyContent={"center"}
            >
              <Image
                src={value.image}
                alt={value.name}
                objectFit={"cover"}
                maxW={{ base: "100px", sm: "150px" }}
                maxH={{ base: "100px", sm: "150px" }}
                flex={1}
              />
            </Flex>
          </Link>
          <Card.Body
            flexDir={"row"}
            // alignItems={"center"}
            // justifyContent={"space-between"}
            flexDirection={"column"}
            paddingInline={{ base: "8px", sm: "10px", md: "15px", lg: "24px" }}
            paddingBlock={0}
          >
            <Card.Title textTransform={"capitalize"} fontWeight={700}>
              {value.name}
            </Card.Title>
            <Flex alignItems={"center"} gap={3}>
              {value.unit.length > 1 ? (
                <Text fontSize={14} color={"red.500"} fontWeight={600}>
                  ₫
                  {Intl.NumberFormat("vi-VN").format(
                    CalculateSalePrice(
                      CalculateWeightPrice(value.price_per_kg, value.unit[0]),
                      value.discount
                    )
                  )}{" "}
                  -{" "}
                  {Intl.NumberFormat("vi-VN").format(
                    CalculateSalePrice(
                      CalculateWeightPrice(
                        value.price_per_kg,
                        value.unit[value.unit.length - 1]
                      ),
                      value.discount
                    )
                  )}
                </Text>
              ) : (
                <Text fontSize={14} color={"red.500"} fontWeight={600}>
                  ₫
                  {Intl.NumberFormat("vi-VN").format(
                    CalculateSalePrice(value.price_per_kg, value.discount)
                  )}
                </Text>
              )}
            </Flex>
          </Card.Body>
          <Card.Footer
            alignItems={"center"}
            justifyContent={"space-between"}
            padding={{ base: "8px", sm: "10px", md: "15px", lg: "24px" }}
          >
            <Flex fontSize={12} gap={2} color={"gray.500"}>
              <Flex
                alignItems={"center"}
                gap={1}
                cursor={"pointer"}
                className="hover:text-red-600"
              >
                <FaHeart className="size-3" /> {value.wishlist.length}
              </Flex>

              <Flex
                alignItems={"center"}
                gap={1}
                cursor={"pointer"}
                className="hover:text-red-600"
              >
                <MdOutlineComment className="size-3" /> {value.comments.length}
              </Flex>
            </Flex>
            <Button
              variant="ghost"
              className=" rounded-full hover:bg-green-600 hover:text-white"
              onClick={handleLink}
            >
              <TiShoppingCart aria-hidden="true" className="size-6" />
            </Button>
          </Card.Footer>
        </Card.Root>
      </Tooltip>
    </GridItem>
  );
};
