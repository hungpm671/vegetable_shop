"use server";

import connectToDB from "@/config/database";
import UsersModel from "@/models/usersModel";
import { CalculateWeightPrice } from "../../utils/CalculateWeightPrice";
import mongoose from "mongoose";

// checking information about user
export async function checkUserInfo(params: string) {
  try {
    await connectToDB();
    const data = JSON.parse(
      JSON.stringify(await UsersModel.find({ email: params }))
    );

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errorMsg: error.message };
    }
    return { errorMsg: "An unknown error occurred" };
  }
}

// get information about user
export async function getUserInfo(params: string) {
  try {
    await connectToDB();
    const data = JSON.parse(
      JSON.stringify(await UsersModel.find({ _id: params }))
    );

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errorMsg: error.message };
    }
    return { errorMsg: "An unknown error occurred" };
  }
}

// add to cart & update cart
export async function addToCart(
  userId: string,
  productId: string,
  productName: string,
  quantity: number,
  price: number,
  discount: number,
  weight: number
) {
  try {
    await connectToDB();

    const newCartItem = {
      product_id: productId,
      quantity: quantity,
      price:
        weight !== 0
          ? CalculateWeightPrice(price, weight) * quantity
          : price * quantity,
      weight: weight,
      discount: discount,
      createdAt: new Date(),
      updateAt: new Date(),
    };

    const result = await UsersModel.updateOne(
      {
        _id: userId,
        "carts.product_id": new mongoose.Types.ObjectId(newCartItem.product_id),
        "carts.weight": newCartItem.weight,
      },
      {
        $inc: { "carts.$.quantity": newCartItem.quantity },
        $set: { "carts.$.updateAt": new Date() },
      },
      { upsert: true }
    );

    if (result.matchedCount === 0) {
      await UsersModel.updateOne(
        { _id: userId },
        { $push: { carts: newCartItem } }
      );
    }

    return {
      message: `Bạn đã thêm ${productName.charAt(0).toUpperCase() + productName.slice(1).toLowerCase()} vào giỏ hàng.`,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errorMsg: error.message };
    }
    return { errorMsg: "An unknown error occurred" };
  }
}

// update cart by quantity
export async function updateCartByQuantity(
  userId: string,
  productId: string,
  quantity: number
) {
  try {
    await connectToDB();

    const result = await UsersModel.updateOne(
      {
        _id: userId,
        "carts.product_id": new mongoose.Types.ObjectId(productId),
      },
      {
        $set: {
          "carts.$.quantity": quantity,
          "carts.$.updateAt": new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return { errorMsg: "User not found" };
    }

    return {
      message: "Số lượng sản phẩm trong giỏ hàng đã được cập nhật thành công.",
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errorMsg: error.message };
    }
    return { errorMsg: "An unknown error occurred" };
  }
}

// remove item cart
export async function removeCartUser(
  userId: string,
  productId: string,
  productName: string
) {
  try {
    await connectToDB();

    const result = await UsersModel.updateOne(
      {
        _id: userId,
      },
      {
        $pull: {
          carts: { product_id: new mongoose.Types.ObjectId(productId) },
        },
      }
    );

    if (result.matchedCount === 0) {
      return { errorMsg: "User not found" };
    }

    return {
      message: `${productName.charAt(0).toUpperCase() + productName.slice(1).toLowerCase()} đã bị xóa khỏi giỏ hàng của bạn.`,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errorMsg: error.message };
    }
    return { errorMsg: "An unknown error occurred" };
  }
}
