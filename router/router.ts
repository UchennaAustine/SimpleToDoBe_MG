import express from "express";
import {
  createUser,
  getAUser,
  getAllUsers,
  signInUser,
  updateUserDetails,
} from "../controller/userController";
import multer from "multer";

const router = express.Router();
const uploading = multer().single("avatar");

router.route("/register").post(uploading, createUser);
router.route("/sign-in").post(signInUser);
router.route("/view-all").get(getAllUsers);
router.route("/:UserID/view-one").get(getAUser);
router.route("/:UserID/update").patch(updateUserDetails);

export default router;
