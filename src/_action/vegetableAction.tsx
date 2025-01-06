"use server";

import connectToMongo from "@/config/database";
import VegetableFruitModel from "@/models/vegetable_fruitModel";

export async function getVegetableFruit() {
  try {
    await connectToMongo();
    const data = JSON.parse(JSON.stringify(await VegetableFruitModel.find()));
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errorMsg: error.message };
    }
    return { errorMsg: "An unknown error occurred" };
  }
}
