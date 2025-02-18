import mongoose from "mongoose";
import { Districts, Provinces, Ward } from "./provinces";

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
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  products: Cart[];
  total_orders: number;
  state: string;
  payment_method: string;
  payment_status: boolean;
  address: string;
  ward: Ward;
  district: Districts;
  province: Provinces;
  country: string;
  delivery_time: string;
  delivery_fee: number;
  note: string;
  createdAt: Date;
}
