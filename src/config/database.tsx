// import dotenv from "dotenv";
// dotenv.config();

// import mongoose from "mongoose";

// async function connectToDB() {
//   if (mongoose.connections[0].readyState) {
//     return true;
//   }

//   try {
//     await mongoose.connect(process.env.MONGO_URI as string, {
//       auth: { username: "hungpm671", password: "LLnkbXsEUQHkyyJL" },
//     });
//     return true;
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     throw error;
//   }
// }

// export default connectToDB;

import dotenv from "dotenv";

// Tải biến môi trường từ file .env
dotenv.config();

import mongoose from "mongoose";

async function connectToDB() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in the environment variables.");
    throw new Error("MONGO_URI is not defined.");
  }

  if (mongoose.connections[0].readyState) {
    return true;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      auth: { username: "hungpm671", password: "LLnkbXsEUQHkyyJL" },
    });
    return true;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export default connectToDB;
