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

const usersSchema = new Schema(
  {
    username: { type: String, require: true, maxLength: 255 },
    email: { type: String, require: true, maxLength: 255 },
    password: { type: String, require: true, maxLength: 255 },
    full_name: { type: String, require: true, maxLength: 255 },
    phone_number: { type: Number, require: true },
    address: { type: String, require: true, maxLength: 255 },
    avatar_url: { type: String, require: true, maxLength: 255 },
    role: { type: String, require: true, maxLength: 255 },
    is_active: { type: Boolean, require: true },
    carts: [CartSchema],
  },
  { timestamps: true }
);

const UsersModel = models.users || model("users", usersSchema);

export default UsersModel;
