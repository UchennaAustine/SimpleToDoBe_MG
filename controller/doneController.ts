import express, { Request, Response } from "express";
import { doneTaskModel } from "../model/doneModel";
import { userModel } from "../model/userModel";
import mongoose from "mongoose";

export const createDoneTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.body;
    const { doneTaskName, donePriority } = req.body;
    const user = await userModel.findById(userID);
    if (!user) {
      return res.status(404).json({
        message: `Invalid User`,
      });
    } else {
      const tasked = await doneTaskModel.create({
        doneTaskName,
        donePriority,
        isComplete: true,
      });

      user?.doneTodos.push(new mongoose.Types.ObjectId(tasked?._id));
      user?.save();

      return res.status(201).json({
        message: `${user?.name}: DoneTask has be created ${tasked?.doneTaskName}`,
        data: tasked,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "DoneTask cannot be created",
    });
  }
};

export const getDoneTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const tasked = await doneTaskModel.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Viewing all DoneTask",
      data: tasked,
    });
  } catch (error) {
    return res.status(404).json({
      message: "DoneTask cannot be Viewed",
    });
  }
};

export const viewOneDoneTodo = async (req: Request, res: Response) => {
  try {
    const { UserID } = req.params;

    const task = await doneTaskModel.findById(UserID).populate({
      path: "doneTodos",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    if (!task) {
      return res.status(404).json({
        message: `Invalid task`,
      });
    } else {
      return res.status(200).json({
        message: `${task?.doneTaskName}:is your  requested todo task`,
        data: task,
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: `viewing todo error: ${error.message}`,
      info: error,
    });
  }
};

export const deleteDoneTodo = async (req: Request, res: Response) => {
  try {
    const { UserID } = req.params;

    const task = await doneTaskModel.findByIdAndDelete(UserID);

    if (!task) {
      return res.status(404).json({
        message: `Invalid task`,
      });
    } else {
      return res.status(200).json({
        message: `${task?.doneTaskName}:is your  deleted todo task`,
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: `deleting todo error: ${error.message}`,
      info: error,
    });
  }
};
