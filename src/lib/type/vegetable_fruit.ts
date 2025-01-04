import { ObjectId } from "mongoose";

export interface VegetableFruit {
  filter: any;
  _id: ID;
  name: string;
  type: string;
  description: string;
  price_per_kg: string;
  state: boolean;
  origin: string;
  image: string;
  discount: number;
  " createdAt": CreatedAt;
}

export interface CreatedAt {
  $date: Date;
}

export interface ID {
  $oid: ObjectId;
}
