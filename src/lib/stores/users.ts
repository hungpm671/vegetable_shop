import { create } from "zustand";
import { Cart } from "../type/users";

interface UserState {
  userEmail: string;
  setUserEmail: (email: string) => void;

  cartUser: Cart[];
  setCartUser: (cart: Cart[]) => void;

  updateCartUser: (cart: Cart) => void;

  updateCartUserByQuantity: (
    id: string,
    weight: number,
    quantity: number
  ) => void;

  deleteCartUser: (id: string, weight: number) => void;
}

export const useUsersStore = create<UserState>()((set) => ({
  userEmail: "",
  setUserEmail: (email) => set(() => ({ userEmail: email })),

  cartUser: [],
  setCartUser: (cart: Cart[]) => set(() => ({ cartUser: cart })),

  updateCartUser: (cart) =>
    set((state) => {
      const index = state.cartUser.findIndex(
        (item) =>
          item.product_id.toString() === cart.product_id.toString() &&
          Number(item.weight) === Number(cart.weight)
      );

      if (index !== -1) {
        const updatedCart = [...state.cartUser];
        updatedCart[index] = {
          ...updatedCart[index],
          quantity: (updatedCart[index].quantity || 0) + (cart.quantity || 0),
        };
        return { cartUser: updatedCart };
      } else {
        return { cartUser: [...state.cartUser, cart] };
      }
    }),

  updateCartUserByQuantity: (id, weight, quantity) =>
    set((state) => {
      const updatedCart = state.cartUser.map((item) =>
        item.product_id.toString() === id.toString() &&
        Number(item.weight) === Number(weight)
          ? { ...item, quantity }
          : item
      );
      return { cartUser: updatedCart };
    }),

  deleteCartUser: (id, weight) =>
    set((state) => {
      const updatedCart = state.cartUser.filter(
        (item) =>
          !(
            item.product_id.toString() === id.toString() &&
            Number(item.weight) === Number(weight)
          )
      );

      return { cartUser: updatedCart };
    }),
}));
