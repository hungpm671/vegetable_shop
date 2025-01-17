import { create } from "zustand";
import { Comments, VegetableFruit, Wishlist } from "../type/vegetable_fruit";

const navigation = [
  { name: "Trang chủ", href: "/", current: true },
  { name: "Sản phẩm", href: "/fresh-products", current: false },
  { name: "Giói thiệu", href: "/#about", current: false },
  { name: "Tin tức", href: "/#news", current: false },
  { name: "Liên hệ", href: "/#contact", current: false },
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

const search_checkox = [
  { label: "Rau củ", checked: false, value: "vegetable" },
  { label: "Thực phẩm khô", checked: false, value: "dry_food" },
  { label: "Hoa quả", checked: false, value: "fruit" },
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

export type SearchCheckbox = {
  label: string;
  checked: boolean;
  value: string;
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

  inputValueSearch: string;
  setInputValueSearch: (value: string) => void;

  fresh_news: FreshNews[];

  feedback: FeedbackProp[];

  userShoppingCart: VegetableFruit[];

  filterSearchType: SearchCheckbox[];
  setFilterSearchType: (index: number, checked: boolean) => void;

  filterArrayConditions: string[];
  setFilterArrayConditions: (conditions: string, checked: boolean) => void;

  setFilterAllSearchType: (checked: boolean) => void;
  setFilterAllArrayConditions: (checked: boolean) => void;

  filterConditions: VegetableFruit[];
  setFilterConditions: (data: VegetableFruit[]) => void;

  initialUnit: number;
  setInitialUnit: (unit: number) => void;

  // comment product
  initialComments: Comments[];
  setComments: (comments: Comments[]) => void;

  updateComment: (comment: Comments) => void;

  // wishlist product
  initialWishlist: Wishlist[];
  setWishlist: (wishlist: Wishlist[]) => void;

  updateWishlist: (item: Wishlist) => void;
}

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

/////////////////////////////////////////////////// zustand
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

  // filter vegetables based on conditions
  type: "fruit",
  setType: (type: string) => set(() => ({ type })),

  filter: "all",
  setFilter: (filter: string) => set({ filter }),

  filterPrice: "all",
  setFilterPrice: (price: string) =>
    set({
      filterPrice: price,
    }),

  // initial vegetable array
  vegetables_fruits: [],
  setVegetableFruits: (data: VegetableFruit[]) =>
    set({
      vegetables_fruits: data,
      filterVegetableFruits: data,
      filterConditions: data,
    }),

  // filter vegetables based on price range & type
  filterVegetableFruits: [],
  setFilterVegetableFruits: (filter: string, filterPrice: string) =>
    set((state) => ({
      filterVegetableFruits: state.vegetables_fruits.filter(
        (fruit) =>
          (filter === "all" ||
            fruit.type.toLowerCase().includes(filter.toLowerCase())) &&
          filterPriceFunct(filterPrice, fruit)
      ),
    })),

  // initial value search input
  inputValueSearch: "",
  setInputValueSearch: (value: string) =>
    set({
      inputValueSearch: value,
    }),

  fresh_news: fresh_news,

  feedback: feedback,

  userShoppingCart: [],

  // filter vegetables based on checkbox
  filterSearchType: search_checkox,
  setFilterSearchType: (index, checked) =>
    set((state) => {
      const newValues = [...state.filterSearchType];
      newValues[index] = { ...newValues[index], checked: !!checked };
      return { filterSearchType: newValues };
    }),

  // filter vegetables based on search conditions
  filterArrayConditions: [],
  setFilterArrayConditions: (conditions: string, checked: boolean) =>
    set((state) => ({
      filterArrayConditions: checked
        ? state.filterArrayConditions.includes(conditions)
          ? state.filterArrayConditions
          : [...state.filterArrayConditions, conditions]
        : state.filterArrayConditions.filter((item) => item !== conditions),
    })),

  // filter vegetables based on all checkbox
  setFilterAllSearchType: (checked) =>
    set((state) => ({
      filterSearchType: state.filterSearchType.map((value) => ({
        ...value,
        checked: !!checked,
      })),
    })),

  setFilterAllArrayConditions: (checked) =>
    set((state) => ({
      filterArrayConditions: checked
        ? state.filterSearchType
            .filter((value) => "value" in value)
            .map((value) => value.value)
        : [],
    })),

  filterConditions: [],
  setFilterConditions: (data: VegetableFruit[]) =>
    set((state) => ({
      filterConditions: data.filter((fruit) =>
        state.filterArrayConditions && state.filterArrayConditions.length > 0
          ? state.filterArrayConditions.some(
              (condition) => fruit.type === condition
            )
          : true
      ),
    })),

  initialUnit: 0,
  setInitialUnit: (unit) =>
    set(() => ({
      initialUnit: unit,
    })),

  // comments for product
  initialComments: [],
  setComments: (comments) =>
    set(() => ({
      initialComments: comments,
    })),

  updateComment: (comment) =>
    set((state) => {
      const index = state.initialComments.findIndex(
        (index) => index.author.toString() == comment.author.toString()
      );

      if (index !== -1) {
        const updateComments = [...state.initialComments];
        updateComments[index] = {
          ...updateComments[index],
          content: comment.content,
          updatedAt: new Date(),
        };

        return { initialComments: updateComments };
      } else {
        return { initialComments: [...state.initialComments, comment] };
      }
    }),

  // wishlist product
  initialWishlist: [],
  setWishlist: (wishlist) =>
    set(() => ({
      initialWishlist: wishlist,
    })),

  updateWishlist: (wishlist) =>
    set((state) => {
      const index = state.initialWishlist.findIndex(
        (item) => item.user_id.toString() === wishlist.user_id.toString()
      );

      if (index !== -1) {
        return {
          initialWishlist: state.initialWishlist.filter(
            (item) => item.user_id.toString() !== wishlist.user_id.toString()
          ),
        };
      } else {
        return { initialWishlist: [...state.initialWishlist, wishlist] };
      }
    }),
}));
