import { Request, Response } from "express";
import { userModel } from "../model/userModel";
import { todoModel } from "../model/todoModel";
import mongoose from "mongoose";

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { UserID } = req.params;
    const { taskName, priority } = req.body;

    const user = await userModel.findById(UserID);

    if (!user) {
      return res.status(404).json({
        message: `Invalid User`,
      });
    } else {
      const task = await todoModel.create({
        taskName,
        priority,
      });

      user?.todos?.push(new mongoose.Types.ObjectId(task?._id));
      user?.save();

      return res.status(201).json({
        message: `${user?.name}: your todo have being created: ${task?.taskName}`,
        data: task,
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: `creating todo error: ${error.message}`,
      info: error,
    });
  }
};

export const viewAllTodo = async (req: Request, res: Response) => {
  try {
    const task = await todoModel.find().sort({ createdAt: -1 });

    if (!task) {
      return res.status(404).json({
        message: `no available user`,
      });
    } else {
      return res.status(200).json({
        message: `All available Todos`,
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

export const viewOneTodo = async (req: Request, res: Response) => {
  try {
    const { UserID } = req.params;

    const task = await todoModel.findById(UserID).populate({
      path: "todos",
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
        message: `${task?.taskName}:is your  requested todo task`,
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

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { UserID } = req.params;

    const task = await todoModel.findByIdAndDelete(UserID);

    if (!task) {
      return res.status(404).json({
        message: `Invalid task`,
      });
    } else {
      return res.status(200).json({
        message: `${task?.taskName}:is your  deleted todo task`,
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: `deleting todo error: ${error.message}`,
      info: error,
    });
  }
};
