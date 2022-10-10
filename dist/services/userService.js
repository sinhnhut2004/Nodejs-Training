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
exports.deleteUser = exports.updateUser = exports.getUsers = exports.getUser = exports.createUser = void 0;
const userModel_1 = require("../models/userModel");
const createUser = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var body = request.payload;
        var findUser = yield userModel_1.UserModel.findOne({ "userID": body.userID });
        if (findUser) {
            return h.response("User da ton tai");
        }
        var a = yield new userModel_1.UserModel(body).save();
        return h.response("tao thanh cong User");
    }
    catch (error) {
        console.log(error);
    }
});
exports.createUser = createUser;
const getUser = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var idUser = request.params.idUser;
        var findUser = yield userModel_1.UserModel.find({ "userID": idUser });
        if (findUser) {
            return h.response(findUser);
        }
        return h.response("Khong tim thay User");
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUser = getUser;
const getUsers = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var idUser = request.params.idUser;
        var findUser = yield userModel_1.UserModel.find({});
        return h.response(findUser);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUsers = getUsers;
const updateUser = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var idUser = request.params.idUser;
        var findUser = yield userModel_1.UserModel.findOneAndUpdate({ "userID": idUser }, { "email": "updated@gmail.com" });
        if (findUser) {
            return h.response("cap nhat nhat User thanh cong");
        }
        return h.response("Cap nhat user khong thanh cong");
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var idUser = request.params.idUser;
        var findUser = yield userModel_1.UserModel.findOneAndDelete({ "userID": idUser });
        if (findUser) {
            return h.response("Delete User thanh cong");
        }
        return h.response("Delete User that bai");
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteUser = deleteUser;
