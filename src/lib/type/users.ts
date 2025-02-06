import mongoose from "mongoose";

export interface Users {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  full_name: string;
  phone_number: number;
  address: string;
  avatar_url: string;
  role: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
  carts: Cart[];
  orders: Order[];
}

export interface Cart {
  _id: mongoose.Types.ObjectId;
  product_id: string;
  quantity: number;
  price: number;
  createdAt: Date;
  updateAt: Date;
  weight: number;
  discount: number;
}

export interface Order {
  _id: mongoose.Types.ObjectId;
  products: Cart[];
  total_orders: number;
  state: string;
  createdAt: Date;
}
