import express from "express";
import {
  createDoneTodo,
  deleteDoneTodo,
  getDoneTodo,
  viewOneDoneTodo,
} from "../controller/doneController";

const router = express.Router();

router.route("/create-done-todo").post(createDoneTodo);
router.route("/view-all-donetodos").get(getDoneTodo);
router.route("/:UserID/view-one-donetodos").get(viewOneDoneTodo);
router.route("/:UserID/delete-donetodos").delete(deleteDoneTodo);

export default router;
