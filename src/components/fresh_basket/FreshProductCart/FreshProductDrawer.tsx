"use client";

import { Button } from "@/components/ui/button";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import ProductCartItem from "./ProductCartItem";
import TotalCart from "../../../../utils/TotalCart";

const userShoppingCart = [
  {
    id: 1,
    name: "đậu đỏ",
    type: "dry-food",
    scientific_name: "vigna angularis",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus adipisci dignissimos, cum vel illo tenetur quaerat dolores! Ab minima delectus, nostrum voluptate quas commodi, itaque facilis nihil mollitia error incidunt?",
    price_per_kg: 10000,
    stock: "in stock",
    origin: "Việt Nam",
    created_at: "2024-12-15T19:35:01.771167+00:00",
    image:
      "https://ihkuirhjqpckozvdlboj.supabase.co/storage/v1/object/public/vegetables_fruits/8f66__dau-do-hat-lon-dalat-300x194.png",
    sale: 0,
  },
  {
    id: 2,
    name: "cà chua",
    type: "vegetable",
    scientific_name: "Lycopersicum esculentum Mill",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus adipisci dignissimos, cum vel illo tenetur quaerat dolores! Ab minima delectus, nostrum voluptate quas commodi, itaque facilis nihil mollitia error incidunt?",
    price_per_kg: 10000,
    stock: "in stock",
    origin: "Việt Nam",
    created_at: "2024-12-15T20:17:59.676764+00:00",
    image:
      "https://ihkuirhjqpckozvdlboj.supabase.co/storage/v1/object/public/vegetables_fruits/280px-Bright_red_tomato_and_cross_section02.jpg",
    sale: 20,
  },
  {
    id: 3,
    name: "bánh mì gối",
    type: "dry-food",
    scientific_name: "break",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus adipisci dignissimos, cum vel illo tenetur quaerat dolores! Ab minima delectus, nostrum voluptate quas commodi, itaque facilis nihil mollitia error incidunt?",
    price_per_kg: 10000,
    stock: "in stock",
    origin: "Việt Nam",
    created_at: "2024-12-15T20:20:12.885922+00:00",
    image:
      "https://ihkuirhjqpckozvdlboj.supabase.co/storage/v1/object/public/vegetables_fruits/banh-my-goi-minh-350x350.jpg",
    sale: 0,
  },
  {
    id: 4,
    name: "bí ngô",
    type: "vegetable",
    scientific_name: "Cucurbita moschata Duch ex Poir",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus adipisci dignissimos, cum vel illo tenetur quaerat dolores! Ab minima delectus, nostrum voluptate quas commodi, itaque facilis nihil mollitia error incidunt?",
    price_per_kg: 10000,
    stock: "in stock",
    origin: "Việt Nam",
    created_at: "2024-12-15T20:22:08.351088+00:00",
    image:
      "https://ihkuirhjqpckozvdlboj.supabase.co/storage/v1/object/public/vegetables_fruits/bicoTien-300x300.jpg",
    sale: 10,
  },
  {
    id: 5,
    name: "bí ngô",
    type: "vegetable",
    scientific_name: "Cucurbita moschata Duch ex Poir",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae numquam facilis dolorum dolorem, aperiam, doloremque eveniet iste veritatis libero sed harum tempore et recusandae! Vero aspernatur fuga quod adipisci similique.",
    price_per_kg: 10000,
    stock: "in stock",
    origin: "Việt Nam",
    created_at: "2024-12-15T20:23:41.521695+00:00",
    image:
      "https://ihkuirhjqpckozvdlboj.supabase.co/storage/v1/object/public/vegetables_fruits/bi-ngo-350x350.jpg",
    sale: 10,
  },
  {
    id: 6,
    name: "cà tím",
    type: "vegetable",
    scientific_name: "Solanum melongena",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae numquam facilis dolorum dolorem, aperiam, doloremque eveniet iste veritatis libero sed harum tempore et recusandae! Vero aspernatur fuga quod adipisci similique.",
    price_per_kg: 10000,
    stock: "in stock",
    origin: "Việt Nam",
    created_at: "2024-12-15T20:24:50.601108+00:00",
    image:
      "https://ihkuirhjqpckozvdlboj.supabase.co/storage/v1/object/public/vegetables_fruits/catim-300x300.jpg",
    sale: 0,
  },
  {
    id: 7,
    name: "đậu đen",
    type: "dry-food",
    scientific_name: "Vigna unguiculata subsp. cylindrica",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae numquam facilis dolorum dolorem, aperiam, doloremque eveniet iste veritatis libero sed harum tempore et recusandae! Vero aspernatur fuga quod adipisci similique.",
    price_per_kg: 10000,
    stock: "in stock",
    origin: "Việt Nam",
    created_at: "2024-12-15T20:26:10.069424+00:00",
    image:
      "https://ihkuirhjqpckozvdlboj.supabase.co/storage/v1/object/public/vegetables_fruits/daudenthainguyen_yexo-350x350.jpg",
    sale: 0,
  },
  {
    id: 9,
    name: "nho tím",
    type: "fruit",
    scientific_name: "Libier Muscat",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae numquam facilis dolorum dolorem, aperiam, doloremque eveniet iste veritatis libero sed harum tempore et recusandae! Vero aspernatur fuga quod adipisci similique.\n",
    price_per_kg: 10000,
    stock: "in stock",
    origin: "Việt Nam",
    created_at: "2024-12-15T20:29:37.112641+00:00",
    image:
      "https://ihkuirhjqpckozvdlboj.supabase.co/storage/v1/object/public/vegetables_fruits/nho_1-300x300.jpg",
    sale: 0,
  },
  {
    id: 8,
    name: "táo",
    type: "fruit",
    scientific_name: "null",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae numquam facilis dolorum dolorem, aperiam, doloremque eveniet iste veritatis libero sed harum tempore et recusandae! Vero aspernatur fuga quod adipisci similique.\n",
    price_per_kg: 10000,
    stock: "in stock",
    origin: "Việt Nam",
    created_at: "2024-12-15T20:27:44.467212+00:00",
    image:
      "https://ihkuirhjqpckozvdlboj.supabase.co/storage/v1/object/public/vegetables_fruits/download.jpg",
    sale: 0,
  },
];

const FreshProductDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)} size="md">
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <TiShoppingCart aria-hidden="true" className="size-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent bgColor={"gray.300"}>
        <DrawerHeader>
          <DrawerTitle
            textTransform={"capitalize"}
            fontWeight={700}
            fontSize={24}
          >
            Giỏ hàng
          </DrawerTitle>
        </DrawerHeader>

        <DrawerBody className="flex" flexDir={"column"} gap={1}>
          {userShoppingCart.map((value, index) => (
            <ProductCartItem key={index} value={value} />
          ))}
        </DrawerBody>
        <DrawerFooter>
          <Button
            bgColor={"green.500"}
            paddingInline={"10px"}
            color={"white"}
            fontWeight={700}
          >
            <TotalCart />
          </Button>
          <DrawerActionTrigger asChild>
            <Button
              variant="outline"
              bgColor={"gray.700"}
              color={"white"}
              paddingInline={"10px"}
            >
              Cancel
            </Button>
          </DrawerActionTrigger>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};

export default FreshProductDrawer;
