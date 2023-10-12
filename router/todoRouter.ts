import express from "express";
import {
  createTodo,
  deleteTodo,
  viewAllTodo,
  viewOneTodo,
} from "../controller/todoController";

const router = express.Router();

router.route("/create-todo").post(createTodo);
router.route("/view-all-todo").get(viewAllTodo);
router.route("/:UserID/view-one-todo").get(viewOneTodo);
router.route("/:UserID/delete-todo").delete(deleteTodo);

export default router;
