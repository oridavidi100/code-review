"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;
exports.default = { MONGO_URL };
