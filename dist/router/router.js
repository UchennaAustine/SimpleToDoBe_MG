"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
// import multer from "multer";
const router = express_1.default.Router();
// const uploading = multer().single("avatar");
router.route("/register").post(userController_1.createUser);
router.route("/sign-in").post(userController_1.signInUser);
router.route("/view-all").get(userController_1.getAllUsers);
router.route("/:UserID/view-one").get(userController_1.getAUser);
router.route("/:UserID/update").patch(userController_1.updateUserDetails);
exports.default = router;
