import { model, models, Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "users", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const WishlistSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
  like: { type: Boolean, required: true },
  dislike: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const vegetableFruitSchema = new Schema(
  {
    name: { type: String, require: true, maxLength: 255 },
    type: { type: String, require: true, maxLength: 255 },
    description: { type: String },
    price_per_kg: { type: Number, require: true },
    state: { type: Boolean, require: true },
    origin: { type: String },
    image: { type: String },
    discount: { type: Number, require: true },
    unit: [{ type: Number }],
    comments: [CommentSchema],
    wishlist: [WishlistSchema],
  },
  { timestamps: true }
);

const VegetableFruitModel =
  models.vegetable_fruits || model("vegetable_fruits", vegetableFruitSchema);

export default VegetableFruitModel;
