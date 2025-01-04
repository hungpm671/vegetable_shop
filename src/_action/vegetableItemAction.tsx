"use server";

import connectToMongo from "@/config/database";
import VegetableFruitModel from "@/models/vegetable_fruitModel";

export async function getVegetableFruitItem(params: string | any) {
  try {
    await connectToMongo();
    const data = JSON.parse(
      JSON.stringify(await VegetableFruitModel.find({ _id: params }))
    );
    return data;
  } catch (error: any) {
    return { errorMsg: error.message };
  }
}
