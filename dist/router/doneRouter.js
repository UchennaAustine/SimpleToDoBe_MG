"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doneController_1 = require("../controller/doneController");
const router = express_1.default.Router();
router.route("/create-done-todo").post(doneController_1.createDoneTodo);
router.route("/view-all-donetodos").get(doneController_1.getDoneTodo);
router.route("/:UserID/view-one-donetodos").get(doneController_1.viewOneDoneTodo);
router.route("/:UserID/delete-donetodos").delete(doneController_1.deleteDoneTodo);
exports.default = router;
