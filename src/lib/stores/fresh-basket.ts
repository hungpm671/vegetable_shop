import { create } from "zustand";
import { VegetableFruit } from "../type/vegetable_fruit";

const navigation = [
  { name: "Trang chủ", href: "/", current: true },
  { name: "Sản phẩm", href: "/fresh-products", current: false },
  { name: "Giói thiệu", href: "#about", current: false },
  { name: "Tin tức", href: "#news", current: false },
  { name: "Liên hệ", href: "#contact", current: false },
];

const fresh_news = [
  {
    id: 1,
    title: "Tin tức mới về món ăn đặc sản Việt Nam",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo omnis et assumenda, maiores officia cupiditate repellat temporibus hic reprehenderit enim tenetur odio doloribus at accusantium aliquid, autem perferendis corrupti commodi!",
    image:
      "https://techmaster-vietnam.github.io/thuc-pham-huu-co/image/new_1.jpg",
  },
  {
    id: 2,
    title: "Tin tức mới về món ăn đặc sản Việt Nam",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo omnis et assumenda, maiores officia cupiditate repellat temporibus hic reprehenderit enim tenetur odio doloribus at accusantium aliquid, autem perferendis corrupti commodi!",
    image:
      "https://techmaster-vietnam.github.io/thuc-pham-huu-co/image/new_2.jpg",
  },
  {
    id: 3,
    title: "Tin tức mới về món ăn đặc sản Việt Nam",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo omnis et assumenda, maiores officia cupiditate repellat temporibus hic reprehenderit enim tenetur odio doloribus at accusantium aliquid, autem perferendis corrupti commodi!",
    image:
      "https://techmaster-vietnam.github.io/thuc-pham-huu-co/image/new_3.jpg",
  },
  {
    id: 4,
    title: "Tin tức mới về món ăn đặc sản Việt Nam",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo omnis et assumenda, maiores officia cupiditate repellat temporibus hic reprehenderit enim tenetur odio doloribus at accusantium aliquid, autem perferendis corrupti commodi!",
    image:
      "https://techmaster-vietnam.github.io/thuc-pham-huu-co/image/new_4.jpg",
  },
];

const feedback = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    content: "This product is very good!",
    created_at: "2024-12-15T20:12:00.000000+00:00",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    content: "The quality is excellent!",
    created_at: "2024-12-15T20:15:00.000000+00:00",
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    content: "The delivery was fast!",
    created_at: "2024-12-15T20:18:00.000000+00:00",
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    content: "The packaging was good!",
    created_at: "2024-12-15T20:21:00.000000+00:00",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@example.com",
    content: "The service was friendly!",
    created_at: "2024-12-15T20:24:00.000000+00:00",
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    content: "The product is good!",
    created_at: "2024-12-15T20:27:00.000000+00:00",
  },
  {
    id: 7,
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    content: "The delivery was fast!",
    created_at: "2024-12-15T20:30:00.000000+00:00",
  },
  {
    id: 8,
    name: "Sarah Thompson",
    email: "sarah.thompson@example.com",
    content: "The packaging was good!",
    created_at: "2024-12-15T20:33:00.000000+00:00",
  },
];

export type NavigationProp = {
  name: string;
  href: string;
  current: boolean;
};

export type VegetableFruitProp = {
  id: number;
  name: string;
  type: string;
  scientific_name: string;
  description: string;
  price_per_kg: number;
  stock: string;
  origin: string;
  created_at: string;
  image: string;
  sale: number;
};

export type FreshNews = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export type FeedbackProp = {
  id: number;
  name: string;
  email: string;
  content: string;
  created_at: string;
};

interface FreshBasketState {
  navigation: NavigationProp[];
  setNavigation: (href: string) => void;

  type: string;
  setType: (type: string) => void;

  filter: string;
  setFilter: (type: string) => void;

  filterPrice: string;
  setFilterPrice: (price: string) => void;

  vegetables_fruits: VegetableFruit[];
  setVegetableFruits: (data: VegetableFruit[]) => void;

  filterVegetableFruits: VegetableFruit[];
  setFilterVegetableFruits: (filter: string, filterPrice: string) => void;

  fresh_news: FreshNews[];

  feedback: FeedbackProp[];

  userShoppingCart: VegetableFruit[];
}

export const useFreshBasketStore = create<FreshBasketState>()((set) => ({
  navigation: navigation,
  setNavigation: (href: string) =>
    set((state) => ({
      navigation: state.navigation.map((item) =>
        item.href === href
          ? { ...item, current: true }
          : { ...item, current: false }
      ),
    })),

  // filter vegetables
  type: "fruit",
  setType: (type: string) => set(() => ({ type })),

  filter: "",
  setFilter: (filter: string) => set({ filter }),

  filterPrice: "",
  setFilterPrice: (price: string) =>
    set({
      filterPrice: price,
    }),

  vegetables_fruits: [],

  filterVegetableFruits: [],
  setVegetableFruits: (data: VegetableFruit[]) =>
    set({
      vegetables_fruits: data,
      filterVegetableFruits: data,
    }),

  setFilterVegetableFruits: (filter: string, filterPrice: string) =>
    set((state) => ({
      filterVegetableFruits: state.vegetables_fruits.filter(
        (fruit) =>
          (filter === "" ||
            fruit.type.toLowerCase().includes(filter.toLowerCase())) &&
          filterPriceFunct(filterPrice, fruit)
      ),
    })),

  fresh_news: fresh_news,

  feedback: feedback,

  userShoppingCart: [],
}));

const filterPriceFunct = (filterPrice: string, fruit: VegetableFruit) => {
  if (filterPrice === "under-10000") {
    return Number(fruit.price_per_kg) < 10000;
  }

  if (filterPrice === "from-10000-to-20000") {
    return (
      Number(fruit.price_per_kg) >= 10000 && Number(fruit.price_per_kg) <= 20000
    );
  }

  if (filterPrice === "from-20000-to-30000") {
    return (
      Number(fruit.price_per_kg) >= 20000 && Number(fruit.price_per_kg) <= 30000
    );
  }

  if (filterPrice === "above-30000") {
    return Number(fruit.price_per_kg) > 30000;
  }

  return true;
};
