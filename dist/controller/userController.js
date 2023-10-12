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
exports.updateUserDetails = exports.getAUser = exports.getAllUsers = exports.signInUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = require("../model/userModel");
const imageStream_1 = require("../utils/imageStream");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        const lock = yield bcrypt_1.default.genSalt(10);
        const encrypt = yield bcrypt_1.default.hash(password, lock);
        const { secure_url, public_id } = (0, imageStream_1.streamUpload)(req);
        const User = yield userModel_1.userModel.create({
            email,
            name,
            password: encrypt,
            avatar: secure_url,
            avatarID: public_id,
        });
        return res.status(201).json({
            message: `${User === null || User === void 0 ? void 0 : User.name} account have being created`,
            data: User,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.createUser = createUser;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const User = yield userModel_1.userModel.findOne({ email });
        if (User) {
            const checkPoint = yield bcrypt_1.default.compare(password, User.password);
            if (checkPoint) {
                return res.status(201).json({
                    message: "view one",
                    data: User,
                });
            }
            else {
                return res.status(404).json({
                    message: "Error with password",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "Error with User",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.signInUser = signInUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const User = yield userModel_1.userModel.find().sort({ createdAt: -1 });
        return res.status(201).json({
            message: "created",
            data: User,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.getAllUsers = getAllUsers;
const getAUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UserID } = req.params;
        const User = yield userModel_1.userModel.findById(UserID);
        return res.status(201).json({
            message: "view one",
            data: User,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.getAUser = getAUser;
const updateUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UserID } = req.params;
        const { HouseAddress, gender, phoneNumber } = req.body;
        const User = yield userModel_1.userModel.findByIdAndUpdate(UserID, {
            HouseAddress,
            gender,
            phoneNumber,
        }, { new: true });
        return res.status(201).json({
            message: "view one",
            data: User,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.updateUserDetails = updateUserDetails;
