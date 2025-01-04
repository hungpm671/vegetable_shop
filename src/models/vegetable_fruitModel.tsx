import { model, models, Schema } from "mongoose";

const vegetableFruitSchema = new Schema(
  {
    name: { type: String, require: true, maxLength: 255 },
    type: { type: String, require: true, maxLength: 255 },
    description: { type: String },
    price_per_kg: { type: String, require: true },
    state: { type: Boolean, require: true },
    origin: { type: String },
    image: { type: String },
    discount: { type: Number, require: true },
  },
  { timestamps: true }
);

const VegetableFruitModel =
  models.vegetable_fruits || model("vegetable_fruits", vegetableFruitSchema);

export default VegetableFruitModel;
