"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router/router"));
const todoRouter_1 = __importDefault(require("./router/todoRouter"));
const doneRouter_1 = __importDefault(require("./router/doneRouter"));
const App = (app) => {
    try {
        app.use(express_1.default.json());
        app.use("/api/v1", router_1.default);
        app.use("/api/v1", todoRouter_1.default);
        app.use("/api/v1", doneRouter_1.default);
        app.use((0, cors_1.default)({
            origin: "*",
            methods: ["GET", "POST", "PATCH", "DELETE"],
        }));
    }
    catch (error) {
        console.log(`Application Error: ${error}`);
    }
};
exports.App = App;
