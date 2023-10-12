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
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../utils/env");
const url = env_1.envs.db;
// const url: string = "mongodb://127.0.0.1:27017/webDB";
const Database = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const active = yield mongoose_1.default.connect(url).then(() => {
            console.log(`Database is Active`);
        });
    }
    catch (error) {
        console.log(`Database error: ${error.message}`);
        console.log(error);
    }
});
exports.default = Database;
