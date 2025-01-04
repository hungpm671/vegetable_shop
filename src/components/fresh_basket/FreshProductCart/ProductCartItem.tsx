import { Button, Flex, Heading, Image, Input, Text } from "@chakra-ui/react";
import React from "react";
import { MdDeleteForever } from "react-icons/md";
import SelectByWeight from "../../../../utils/SelectByWeight";
import { VegetableFruit } from "@/lib/type/vegetable_fruit";
import { VegetableFruitProp } from "@/lib/stores/fresh-basket";

export default function ProductCartItem({
  value,
}: {
  value: VegetableFruitProp;
}) {
  return (
    <Flex
      bgColor={"white"}
      padding={"10px 5px"}
      className="rounded-md"
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Flex gap={4}>
        <Image
          src={value.image}
          alt={value.name}
          w={100}
          h={100}
          objectFit={"cover"}
        />

        <Flex flexDir={"column"} flex={1} gap={2}>
          <Heading
            as={"h4"}
            fontWeight={600}
            fontSize={17}
            textTransform={"capitalize"}
          >
            {value.name}
          </Heading>

          <select name="cars" id="cars" className="bg-gray-100">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
          <Text>Phân loại: {value.type}</Text>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Text color={"red.400"}>{value.price_per_kg}</Text>
            <Flex>
              <input
                type="number"
                defaultValue={1}
                className="border bg-white w-[50px]"
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Button bgColor={"red.600"} h={"100%"}>
        <MdDeleteForever color="white" />
      </Button>
    </Flex>
  );
}
