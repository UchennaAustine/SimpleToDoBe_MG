import mongoose from "mongoose";
import { iTodoData } from "../utils/interfaces";

const todoSchema = new mongoose.Schema<iTodoData>({
  taskName: {
    type: String,
    trim: true,
  },
  priority: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
});

export const todoModel = mongoose.model<iTodoData>("todos", todoSchema);
