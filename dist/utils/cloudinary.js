"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const env_1 = require("./env");
cloudinary_1.v2.config({
    cloud_name: env_1.envs.cloud_name,
    api_key: env_1.envs.api_key,
    api_secret: env_1.envs.api_secret,
});
exports.default = cloudinary_1.v2;
