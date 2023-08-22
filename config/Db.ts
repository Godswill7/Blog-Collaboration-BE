import mongoose from "mongoose";
import env from "dotenv";
env.config();

const db_URL: string = process.env.DB_STRING!;

export const db = () => {
  try {
    mongoose.connect(db_URL).then(() => {
      console.log("DB connected💥🛩🛩");
    });
  } catch (error) {
    console.log(error);
  }
};
