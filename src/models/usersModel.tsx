import { model, models, Schema } from "mongoose";

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
  },
  { timestamps: true }
);

const UsersModel = models.users || model("users", usersSchema);

export default UsersModel;
