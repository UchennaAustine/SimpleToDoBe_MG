import mongoose, { Document } from "mongoose";

export interface iUser {
  email: string;
  password: string;
  name: string;
  // avatar: string;
  // avatarID: string;
  todos: {}[];
  doneTodos: {}[];
}

export interface iUserData extends iUser, Document {}

export interface iDoneTask {
  doneTaskName?: string;
  donePriority?: string;
  isComplete?: boolean;
  user?: {};
}

export interface iDoneTaskData extends iDoneTask, mongoose.Document {}

export interface iTodo {
  taskName?: string;
  priority?: string;
  user?: {};
}

export interface iTodoData extends iTodo, mongoose.Document {}
