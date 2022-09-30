"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usertRoutes = void 0;
const joi_1 = __importDefault(require("joi"));
const userService_1 = require("../services/userService");
const userPayload = joi_1.default.object({
    userID: joi_1.default.string().required(),
    userName: joi_1.default.string().required(),
    email: joi_1.default.string().required()
});
// create User
const usertRoutes = (server) => {
    server.route({
        method: "POST",
        path: "/user",
        options: {
            description: 'Create new user',
            notes: 'This route create new user',
            tags: ['api'],
            validate: {
                payload: userPayload,
            }
        },
        handler: userService_1.createUser
    });
    //get a User by idUser
    server.route({
        method: "GET",
        path: "/user/{idUser}",
        options: {
            description: 'GET A User',
            notes: 'This route GET A User',
            tags: ['api']
        },
        handler: userService_1.getUser
    });
    //get all users
    server.route({
        method: "GET",
        path: "/user",
        options: {
            description: 'GET All User',
            notes: 'This route GET All User',
            tags: ['api']
        },
        handler: userService_1.getUsers
    });
    //update a user
    server.route({
        method: "PUT",
        path: "/user/{idUser}",
        options: {
            description: 'Update a User',
            notes: 'This route Update a User',
            tags: ['api']
        },
        handler: userService_1.updateUser
    });
    //delete user
    server.route({
        method: "DELETE",
        path: "/user/{idUser}",
        options: {
            description: 'Delete User',
            notes: 'This route delete User',
            tags: ['api']
        },
        handler: userService_1.deleteUser
    });
};
exports.usertRoutes = usertRoutes;
