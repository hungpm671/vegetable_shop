import { ObjectId } from "mongoose";

export interface VegetableFruit {
  _id: ID;
  name: string;
  type: string;
  description: string;
  price_per_kg: number;
  state: boolean;
  origin: string;
  image: string;
  discount: number;
  unit: number[];
  comments: string[];
  createdAt: CreatedAt;
}

export interface CreatedAt {
  $date: Date;
}

export interface ID {
  $oid: ObjectId;
}
