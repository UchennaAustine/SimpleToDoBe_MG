"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.viewOneTodo = exports.viewAllTodo = exports.createTodo = void 0;
const userModel_1 = require("../model/userModel");
const todoModel_1 = require("../model/todoModel");
const mongoose_1 = __importDefault(require("mongoose"));
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { UserID } = req.params;
        const { taskName, priority } = req.body;
        const user = yield userModel_1.userModel.findById(UserID);
        if (!user) {
            return res.status(404).json({
                message: `Invalid User`,
            });
        }
        else {
            const task = yield todoModel_1.todoModel.create({
                taskName,
                priority,
            });
            (_a = user === null || user === void 0 ? void 0 : user.todos) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(task === null || task === void 0 ? void 0 : task._id));
            user === null || user === void 0 ? void 0 : user.save();
            return res.status(201).json({
                message: `${user === null || user === void 0 ? void 0 : user.name}: your todo have being created: ${task === null || task === void 0 ? void 0 : task.taskName}`,
                data: task,
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: `creating todo error: ${error.message}`,
            info: error,
        });
    }
});
exports.createTodo = createTodo;
const viewAllTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield todoModel_1.todoModel.find().sort({ createdAt: -1 });
        if (!task) {
            return res.status(404).json({
                message: `no available user`,
            });
        }
        else {
            return res.status(200).json({
                message: `All available Todos`,
                data: task,
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: `viewing todo error: ${error.message}`,
            info: error,
        });
    }
});
exports.viewAllTodo = viewAllTodo;
const viewOneTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UserID } = req.params;
        const task = yield todoModel_1.todoModel.findById(UserID).populate({
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
        }
        else {
            return res.status(200).json({
                message: `${task === null || task === void 0 ? void 0 : task.taskName}:is your  requested todo task`,
                data: task,
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: `viewing todo error: ${error.message}`,
            info: error,
        });
    }
});
exports.viewOneTodo = viewOneTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UserID } = req.params;
        const task = yield todoModel_1.todoModel.findByIdAndDelete(UserID);
        if (!task) {
            return res.status(404).json({
                message: `Invalid task`,
            });
        }
        else {
            return res.status(200).json({
                message: `${task === null || task === void 0 ? void 0 : task.taskName}:is your  deleted todo task`,
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: `deleting todo error: ${error.message}`,
            info: error,
        });
    }
});
exports.deleteTodo = deleteTodo;
