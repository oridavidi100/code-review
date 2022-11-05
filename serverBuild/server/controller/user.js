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
const User_1 = require("../db/User");
exports.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        const usersArr = yield User_1.User.find({ userName: userName });
        if (usersArr.length === 0) {
            throw { status: 404, message: 'user not exist' };
        }
        for (let user of usersArr) {
            if (user.password === password) {
                return res
                    .send({ userName: user.userName, admin: user.isAdmin })
                    .status(200);
            }
        }
        throw { status: 401, message: 'password incorrect' };
    }
    catch (error) {
        next(error);
    }
});
