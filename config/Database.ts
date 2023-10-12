import mongoose from "mongoose";
import { envs } from "../utils/env";

const url: string = envs.db;
// const url: string = "mongodb://127.0.0.1:27017/webDB";

const Database = async () => {
  try {
    const active = await mongoose.connect(url).then(() => {
      console.log(`Database is Active`);
    });
  } catch (error: any) {
    console.log(`Database error: ${error.message}`);
    console.log(error);
  }
};

export default Database;
