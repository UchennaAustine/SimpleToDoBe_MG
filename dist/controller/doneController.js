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
exports.deleteDoneTodo = exports.viewOneDoneTodo = exports.getDoneTodo = exports.createDoneTodo = void 0;
const doneModel_1 = require("../model/doneModel");
const userModel_1 = require("../model/userModel");
const mongoose_1 = __importDefault(require("mongoose"));
const createDoneTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.body;
        const { doneTaskName, donePriority } = req.body;
        const user = yield userModel_1.userModel.findById(userID);
        if (!user) {
            return res.status(404).json({
                message: `Invalid User`,
            });
        }
        else {
            const tasked = yield doneModel_1.doneTaskModel.create({
                doneTaskName,
                donePriority,
                isComplete: true,
            });
            user === null || user === void 0 ? void 0 : user.doneTodos.push(new mongoose_1.default.Types.ObjectId(tasked === null || tasked === void 0 ? void 0 : tasked._id));
            user === null || user === void 0 ? void 0 : user.save();
            return res.status(201).json({
                message: `${user === null || user === void 0 ? void 0 : user.name}: DoneTask has be created ${tasked === null || tasked === void 0 ? void 0 : tasked.doneTaskName}`,
                data: tasked,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "DoneTask cannot be created",
        });
    }
});
exports.createDoneTodo = createDoneTodo;
const getDoneTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasked = yield doneModel_1.doneTaskModel.find().sort({ createdAt: -1 });
        return res.status(200).json({
            message: "Viewing all DoneTask",
            data: tasked,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "DoneTask cannot be Viewed",
        });
    }
});
exports.getDoneTodo = getDoneTodo;
const viewOneDoneTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UserID } = req.params;
        const task = yield doneModel_1.doneTaskModel.findById(UserID).populate({
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
        }
        else {
            return res.status(200).json({
                message: `${task === null || task === void 0 ? void 0 : task.doneTaskName}:is your  requested todo task`,
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
exports.viewOneDoneTodo = viewOneDoneTodo;
const deleteDoneTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UserID } = req.params;
        const task = yield doneModel_1.doneTaskModel.findByIdAndDelete(UserID);
        if (!task) {
            return res.status(404).json({
                message: `Invalid task`,
            });
        }
        else {
            return res.status(200).json({
                message: `${task === null || task === void 0 ? void 0 : task.doneTaskName}:is your  deleted todo task`,
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
exports.deleteDoneTodo = deleteDoneTodo;
