"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeBlock = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CodeBlockSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const CodeBlock = mongoose_1.default.model('CodeBlock', CodeBlockSchema);
exports.CodeBlock = CodeBlock;
