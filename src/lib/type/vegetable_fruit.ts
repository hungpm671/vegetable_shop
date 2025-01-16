import mongoose, { ObjectId } from "mongoose";

export interface VegetableFruit {
  _id: mongoose.Types.ObjectId;
  name: string;
  type: string;
  description: string;
  price_per_kg: number;
  state: boolean;
  origin: string;
  image: string;
  discount: number;
  unit: number[];
  comments: Comments[];
  wishlist: Wishlist[];
  createdAt: CreatedAt;
}

export interface CreatedAt {
  $date: Date;
}

export interface ID {
  $oid: ObjectId;
}

export interface Comments {
  _id: mongoose.Types.ObjectId;
  author: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Wishlist {
  _id: mongoose.Types.ObjectId;
  user_id: string;
  like: boolean;
  dislike: boolean;
  createdAt: Date;
  updatedAt: Date;
}
