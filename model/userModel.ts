import mongoose, { Schema } from "mongoose";
import { iUserData } from "../utils/interfaces";

const userSchema = new Schema<iUserData>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      toLowerCase: true,
      unique: true,
    },
    password: {
      type: String,
    },

    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    todos: [
      {
        type: mongoose.Types.ObjectId,
        ref: "todos",
      },
    ],
    doneTodos: [
      {
        type: mongoose.Types.ObjectId,
        ref: "doneTasks",
      },
    ],
  },
  { timestamps: true }
);

export const userModel = mongoose.model<iUserData>("students", userSchema);
