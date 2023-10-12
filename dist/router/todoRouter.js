"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controller/todoController");
const router = express_1.default.Router();
router.route("/create-todo").post(todoController_1.createTodo);
router.route("/view-all-todo").get(todoController_1.viewAllTodo);
router.route("/:UserID/view-one-todo").get(todoController_1.viewOneTodo);
router.route("/:UserID/delete-todo").delete(todoController_1.deleteTodo);
exports.default = router;
