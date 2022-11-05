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
exports.onConnection = void 0;
const index_1 = require("../index");
const CodeBlock_1 = require("../db/CodeBlock");
const onConnection = (socket) => {
    socket.on('join', ({ room }) => {
        socket.join(room);
    });
    socket.on('update', ({ content, id }) => __awaiter(void 0, void 0, void 0, function* () {
        yield CodeBlock_1.CodeBlock.findOneAndUpdate({ _id: id }, { content: content });
        index_1.io.sockets.in(id).emit('updateBack', { content });
    }));
    socket.on('updateTitle', ({ title, id }) => __awaiter(void 0, void 0, void 0, function* () {
        yield CodeBlock_1.CodeBlock.findOneAndUpdate({ _id: id }, { title: title });
        socket.broadcast.to(id).emit('updateTitleBack', { title });
    }));
    socket.on('correctAnswer', () => __awaiter(void 0, void 0, void 0, function* () {
        socket.broadcast.emit('correctAnswerBack');
    }));
    socket.on('disconnect', () => { });
};
exports.onConnection = onConnection;
