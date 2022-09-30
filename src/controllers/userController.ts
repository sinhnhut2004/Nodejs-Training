import { Server } from "@hapi/hapi";
import Joi from "joi";
import { createUser, getUser, getUsers, deleteUser, updateUser } from "../services/userService";


const userPayload = Joi.object({
    userID: Joi.string().required(), 
    userName: Joi.string().required(),
    email: Joi.string().required()
});

    // create User
export const usertRoutes = (server: Server) => {
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
        handler: createUser
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
        handler: getUser
    });

    //get all events
    server.route({
        method: "GET",
        path: "/user",
        options: {
            description: 'GET All User',
            notes: 'This route GET All User',
            tags: ['api']
        },
        handler: getUsers
    });

    //update a event
    server.route({
        method: "PUT",
        path: "/user/{idUser}",
        options: {
            description: 'Update a User',
            notes: 'This route Update a User',
            tags: ['api']
        },
        handler: updateUser
    });

    //delete event
    server.route({
        method: "DELETE",
        path: "/user/{idUser}",
        options: {
            description: 'Delete User',
            notes: 'This route delete User',
            tags: ['api']
        },
        handler: deleteUser
    });

}