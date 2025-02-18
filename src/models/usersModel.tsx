import { model, models, Schema } from "mongoose";

const CartSchema = new Schema({
  product_id: { type: Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  weight: { type: Number, required: true },
  discount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

const WardSchema = new Schema({
  name: { type: String, required: true },
  code: { type: Number, required: true },
  division_type: { type: String, required: true },
  codename: { type: String, required: true },
  district_code: { type: Number, required: true },
});

const DistrictSchema = new Schema({
  name: { type: String, required: true },
  code: { type: Number, required: true },
  division_type: { type: String, required: true },
  codename: { type: String, required: true },
  province_code: { type: Number, required: true },
  wards: [WardSchema],
});

const ProvinceSchema = new Schema({
  name: { type: String, required: true },
  code: { type: Number, required: true },
  division_type: { type: String, required: true },
  codename: { type: String, required: true },
  phone_code: { type: Number, required: true },
  districts: [DistrictSchema],
});

const OrderSchema = new Schema({
  customer_name: { type: String, required: true },
  customer_email: { type: String, required: true },
  customer_phone: { type: String, required: true },
  products: [CartSchema],
  total_orders: { type: Number, required: true },
  state: { type: String, required: true },
  payment_method: { type: String, required: true },
  payment_status: { type: Boolean, required: true },
  address: { type: String },
  ward: { type: WardSchema, required: true },
  district: { type: DistrictSchema, required: true },
  province: { type: ProvinceSchema, required: true },
  country: { type: String, required: true },
  delivery_time: { type: String },
  delivery_fee: { type: Number, required: true },
  note: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const usersSchema = new Schema(
  {
    username: { type: String, require: true, maxLength: 255 },
    email: { type: String, require: true, maxLength: 255 },
    password: { type: String, require: true, maxLength: 255 },
    full_name: { type: String, require: true, maxLength: 255 },
    phone_number: { type: Number, require: true },
    avatar_url: { type: String, require: true, maxLength: 255 },
    role: { type: String, require: true, maxLength: 255 },
    is_active: { type: Boolean, require: true },
    carts: [CartSchema],
    orders: [OrderSchema],
  },
  { timestamps: true }
);

const UsersModel = models.users || model("users", usersSchema);

export default UsersModel;
