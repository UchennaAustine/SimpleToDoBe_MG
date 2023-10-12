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
const express_1 = __importDefault(require("express"));
const env_1 = require("./utils/env");
const app_1 = require("./app");
const Database_1 = __importDefault(require("./config/Database"));
process.on("uncaughtException", (error) => {
    console.log("uncaughtException", error);
    process.exit(-1);
});
const port = env_1.envs.port;
const app = (0, express_1.default)();
(0, app_1.App)(app);
const server = app.listen(process.env.port || port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, Database_1.default)();
    console.log("Active: ", port);
}));
process.on("uncaughtException", (error) => {
    console.log("uncaughtException", error);
    server.close(() => {
        process.exit(-1);
    });
});
