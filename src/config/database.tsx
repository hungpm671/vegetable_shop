import mongoose from "mongoose";

async function connectToDB() {
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
