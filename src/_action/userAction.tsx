"use server";

import connectToDB from "@/config/database";
import UsersModel from "@/models/usersModel";

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
