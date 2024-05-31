import mongoose from "mongoose";
import env from "dotenv";
env.config();

export const db = () => {
  try {
    mongoose.connect(process.env.DB_STRING!).then(() => {
      console.log("DB connected💥🛩🛩");
    });
  } catch (error) {
    console.log(error);
  }
};
