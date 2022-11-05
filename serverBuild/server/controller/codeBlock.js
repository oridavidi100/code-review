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
Object.defineProperty(exports, "__esModule", { value: true });
const CodeBlock_1 = require("../db/CodeBlock");
exports.findAllCodeBlocks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const codeBlock = yield CodeBlock_1.CodeBlock.find().select({ title: 1, name: 1 });
        res.send(codeBlock);
    }
    catch (_a) { }
});
exports.findOneCodeBlock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const codeBlock = yield CodeBlock_1.CodeBlock.findById(id).select({
            content: 1,
            _id: 0,
        });
        res.send(codeBlock).status(200);
    }
    catch (err) {
        console.log(err);
    }
});
exports.changeCodeBlockName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, newName } = req.body;
        yield CodeBlock_1.CodeBlock.findOneAndUpdate({ _id: id }, { name: newName });
        res.send('name of code block changed');
    }
    catch (err) {
        console.log(err);
    }
});
