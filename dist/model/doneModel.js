"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doneTaskModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const doneSchema = new mongoose_1.default.Schema({
    doneTaskName: {
        type: String,
        trim: true,
    },
    donePriority: {
        type: String,
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "users",
    },
    isComplete: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.doneTaskModel = mongoose_1.default.model("doneTasks", doneSchema);
