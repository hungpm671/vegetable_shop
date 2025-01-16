"use server";

import connectToMongo from "@/config/database";
import VegetableFruitModel from "@/models/vegetable_fruitModel";
import mongoose from "mongoose";

export async function getVegetableFruitItem(params: string) {
  try {
    await connectToMongo();
    const data = JSON.parse(
      JSON.stringify(await VegetableFruitModel.find({ _id: params }))
    );
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errorMsg: error.message };
    }
    return { errorMsg: "An unknown error occurred" };
  }
}

export async function updateVegetableFruitComment(
  userId: string,
  productId: string,
  content: string
) {
  try {
    await connectToMongo();

    const newComments = {
      author: userId,
      content: content,
      createdAt: new Date(),
      updateAt: new Date(),
    };

    const result = await VegetableFruitModel.updateOne(
      {
        _id: productId,
        "comments.author": new mongoose.Types.ObjectId(userId),
      },
      {
        $set: {
          "comments.$.content": content,
          "comments.$.updateAt": new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      await VegetableFruitModel.updateOne(
        {
          _id: productId,
        },
        {
          $push: { comments: newComments },
        }
      );
    }

    return {
      message:
        "Cảm ơn bạn đã dành thời gian bình luận. Hãy tiếp tục chia sẻ để giúp chúng tôi phục vụ bạn tốt hơn!",
    };
  } catch (error) {
    if (error instanceof Error) {
      return { errorMsg: error.message };
    }
    return { errorMsg: "An unknown error occurred" };
  }
}

export async function updateVegetableFruitWishlist(
  productId: string,
  userId: string
) {
  try {
    await connectToMongo();

    const wishlist = {
      user_id: userId,
      like: false,
      dislike: false,
      createdAt: new Date(),
      updateAt: new Date(),
    };

    const result = await VegetableFruitModel.findOne({
      _id: productId,
      "wishlist.user_id": new mongoose.Types.ObjectId(userId),
    });

    if (!result) {
      await VegetableFruitModel.updateOne(
        {
          _id: productId,
        },
        {
          $push: { wishlist: wishlist },
        }
      );
    } else {
      await VegetableFruitModel.updateOne(
        {
          _id: productId,
        },
        {
          $pull: {
            wishlist: {
              user_id: new mongoose.Types.ObjectId(userId),
            },
          },
        }
      );
    }

    return {
      message: "Sự ủng hộ của bạn là động lực to lớn với chúng tôi!",
    };
  } catch (error) {
    if (error instanceof Error) {
      return { errorMsg: error.message };
    }
    return { errorMsg: "An unknown error occurred" };
  }
}
