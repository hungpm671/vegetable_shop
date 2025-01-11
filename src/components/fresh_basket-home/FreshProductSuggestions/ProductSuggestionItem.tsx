import { Button, Flex, GridItem, Image, Text } from "@chakra-ui/react";
import { VegetableFruit } from "@/lib/type/vegetable_fruit";
import CalculateSalePrice from "../../../../utils/CalculateSalePrice";
export default function ProductSuggestionItem({
  value,
}: {
  value: VegetableFruit;
}) {
  const handleLink = () => {
    window.location.href = `/fresh-products/${value._id}`;
  };

  return (
    <GridItem
      className="product-suggesstion border flex"
      borderRadius={5}
      padding={"10px 15px 10px 30px"}
      alignItems={"center"}
      gap={2}
      position={"relative"}
      boxShadow={"md"}
    >
      {value.discount > 0 && (
        <Flex
          className="border rounded-full"
          alignItems={"center"}
          justifyContent={"center"}
          position={"absolute"}
          top={-3}
          left={-3}
          fontSize={12}
          padding={"5px"}
          background={"green.500"}
          w={10}
          h={10}
          zIndex={1}
          color={"#fff"}
        >
          -{value.discount}%
        </Flex>
      )}
      <Image
        src={value.image}
        alt={value.name}
        width={20}
        h={20}
        objectFit={"cover"}
      />
      <Flex flexDir={"column"}>
        <Text fontWeight={600} textTransform={"capitalize"}>
          {value.name}
        </Text>
        <Flex alignItems={"center"} gap={3}>
          <Text fontSize={12}>
            {Intl.NumberFormat("vi-VN").format(
              CalculateSalePrice(value.price_per_kg, value.discount)
            )}
            ₫/kg
          </Text>

          {value.discount !== 0 && (
            <Text as={"s"} fontSize={10} color={"gray.400"}>
              {Intl.NumberFormat("vi-VN").format(Number(value.price_per_kg))}
              ₫/kg
            </Text>
          )}
        </Flex>
      </Flex>

      <Button
        background={"green.500"}
        position={"absolute"}
        size={"sm"}
        className="product-suggesstion_btn"
        color={"#fff"}
        fontWeight={600}
        onClick={handleLink}
      >
        Xem chi tiết
      </Button>
    </GridItem>
  );
}
