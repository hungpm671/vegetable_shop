"use server";

import connectToDB from "@/config/database";
import UsersModel from "@/models/usersModel";
import { CalculateWeightPrice } from "../../utils/CalculateWeightPrice";
import mongoose from "mongoose";
import CalculateSalePrice from "../../utils/CalculateSalePrice";
import { Cart } from "@/lib/type/users";

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
      }
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
  weight: number,
  quantity: number
) {
  try {
    await connectToDB();

    const result = await UsersModel.updateOne(
      {
        _id: userId,
        "carts.product_id": new mongoose.Types.ObjectId(productId),
        "carts.weight": weight,
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
  productName: string,
  weight: number
) {
  try {
    await connectToDB();

    const result = await UsersModel.updateOne(
      {
        _id: userId,
      },
      {
        $pull: {
          carts: {
            product_id: new mongoose.Types.ObjectId(productId),
            weight: weight,
          },
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

// register user
export async function registerUser(
  username: string,
  email: string,
  password: string
) {
  try {
    await connectToDB();

    const userExist = await UsersModel.findOne({ email: email });

    if (userExist) {
      return { errorMsg: "Email đã tồn tại" };
    }

    const newUser = new UsersModel({
      username: username,
      email: email,
      password: password,
      full_name: "",
      phone_number: "",
      address: "",
      avatar_url: "",
      role: "user",
      is_active: true,
      carts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newUser.save();

    return { message: "Đăng ký thành công" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errorMsg: error.message };
    }
    return {
      errorMsg:
        "Đăng ký không thành công. Vui lòng kiểm tra thông tin và thử lại!",
    };
  }
}

// update information about the user
export async function updateUserInfo(
  userId: string,
  full_name: string,
  phone_number: string,
  address: string
) {
  try {
    await connectToDB();

    const result = await UsersModel.updateOne(
      {
        _id: userId,
      },
      {
        $set: {
          full_name: full_name,
          phone_number: phone_number,
          address: address,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return { errorMsg: "User not found" };
    }

    return { message: "Cập nhật thông tin thành công" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errorMsg: error.message };
    }
    return { errorMsg: "An unknown error occurred" };
  }
}

// order
export async function orderByUser(userId: string, cartUser: Cart[]) {
  try {
    await connectToDB();

    const newOrderItem = {
      products: [...cartUser],
      total_orders: Number(
        cartUser.reduce(
          (acc, curr) =>
            acc + CalculateSalePrice(curr.price, curr.discount) * curr.quantity,
          0
        )
      ),
      state: "pending",
      createdAt: new Date(),
    };

    console.log(userId, newOrderItem);

    const result = await UsersModel.updateOne(
      { _id: userId },
      { $push: { orders: newOrderItem } }
    );

    if (result.matchedCount === 0) {
      return { errorMsg: "User not found" };
    }

    return {
      message:
        "Đơn hàng của bạn đã được xác nhận. Chúng tôi sẽ sớm chuẩn bị và giao hàng cho bạn!",
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errorMsg: error.message };
    }
    return { errorMsg: "An unknown error occurred" };
  }
}
