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
exports.deleteUser = exports.updateUser = exports.getUsers = exports.getUser = exports.createUser = exports.usertRoutes = void 0;
const joi_1 = __importDefault(require("joi"));
const userModel_1 = require("../models/userModel");
// validate by joi for request
const userPayload = joi_1.default.object({
    userID: joi_1.default.string().required(),
    userName: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
});
const usertRoutes = (server) => {
    server.route({
        method: "POST",
        path: "/user",
        options: {
            description: "Create new user",
            notes: "This route create new user",
            tags: ["api"],
            validate: {
                payload: userPayload,
            },
        },
        handler: exports.createUser,
    });
    server.route({
        method: "GET",
        path: "/user/{id}",
        options: {
            description: "GET A User",
            notes: "This route GET A User",
            tags: ["api"],
        },
        handler: exports.getUser,
    });
    server.route({
        method: "GET",
        path: "/user",
        options: {
            description: "GET All User",
            notes: "This route GET All User",
            tags: ["api"],
        },
        handler: exports.getUsers,
    });
    server.route({
        method: "PUT",
        path: "/user/{id}",
        options: {
            description: "Update a User",
            notes: "This route Update a User",
            tags: ["api"],
        },
        handler: exports.updateUser,
    });
    server.route({
        method: "DELETE",
        path: "/user/{id}",
        options: {
            description: "Delete User",
            notes: "This route delete User",
            tags: ["api"],
        },
        handler: exports.deleteUser,
    });
};
exports.usertRoutes = usertRoutes;
// Create new user
const createUser = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var body = request.payload;
        var findUser = yield userModel_1.UserModel.findOne({ userID: body.userID });
        if (findUser) {
            return h.response("User already created");
        }
        var a = yield new userModel_1.UserModel(body).save();
        return h.response("Create user successfully");
    }
    catch (error) {
        console.log(error);
    }
});
exports.createUser = createUser;
// Get a user by ID
const getUser = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var idUser = request.params.id;
        var findUser = yield userModel_1.UserModel.find({ userID: idUser });
        if (findUser) {
            return h.response(findUser);
        }
        return h.response("Not found user");
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUser = getUser;
// Get all users
const getUsers = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var idUser = request.params.id;
        var findUser = yield userModel_1.UserModel.find({});
        if (findUser) {
            return h.response(findUser);
        }
        return h.response("Not found user");
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUsers = getUsers;
// Update a user by ID
const updateUser = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var idUser = request.params.id;
        var findUser = yield userModel_1.UserModel.findOneAndUpdate({ userID: idUser }, { email: "updated@gmail.com" });
        if (findUser) {
            return h.response("Update user successfully");
        }
        return h.response("Update user fail");
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateUser = updateUser;
// Delete a user by ID
const deleteUser = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var idUser = request.params.id;
        var findUser = yield userModel_1.UserModel.findOneAndDelete({ userID: idUser });
        if (findUser) {
            return h.response("Delete user successfully");
        }
        return h.response("Delete user fail");
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteUser = deleteUser;
