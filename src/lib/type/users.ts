import { ObjectId } from "mongoose";

export interface Users {
  _id: ID;
  username: string;
  email: string;
  password: string;
  full_name: string;
  phone_number: string;
  address: string;
  avatar_url: string;
  role: string;
  is_active: boolean;
  created_at: AtedAt;
  updated_at: AtedAt;
}

export interface ID {
  $oid: ObjectId;
}

export interface AtedAt {
  $date: Date;
}
