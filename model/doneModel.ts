import mongoose from "mongoose";
import { iDoneTaskData } from "../utils/interfaces";

const doneSchema = new mongoose.Schema<iDoneTaskData>(
  {
    doneTaskName: {
      type: String,
      trim: true,
    },
    donePriority: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const doneTaskModel = mongoose.model<iDoneTaskData>(
  "doneTasks",
  doneSchema
);
