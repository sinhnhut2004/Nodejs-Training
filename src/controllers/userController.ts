import { Server } from "@hapi/hapi";
import Joi from "joi";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { UserModel, IUser } from "../models/userModel";

// validate by joi for request
const userPayload = Joi.object({
  userID: Joi.string().required(),
  userName: Joi.string().required(),
  email: Joi.string().required(),
});

export const usertRoutes = (server: Server) => {
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
    handler: createUser,
  });

  server.route({
    method: "GET",
    path: "/user/{id}",
    options: {
      description: "GET A User",
      notes: "This route GET A User",
      tags: ["api"],
    },
    handler: getUser,
  });

  server.route({
    method: "GET",
    path: "/user",
    options: {
      description: "GET All User",
      notes: "This route GET All User",
      tags: ["api"],
    },
    handler: getUsers,
  });

  server.route({
    method: "PUT",
    path: "/user/{id}",
    options: {
      description: "Update a User",
      notes: "This route Update a User",
      tags: ["api"],
    },
    handler: updateUser,
  });

  server.route({
    method: "DELETE",
    path: "/user/{id}",
    options: {
      description: "Delete User",
      notes: "This route delete User",
      tags: ["api"],
    },
    handler: deleteUser,
  });
};

// Create new user
export const createUser = async (request: Request, h: ResponseToolkit) => {
  try {
    var body = <IUser>request.payload;
    var findUser = await UserModel.findOne({ userID: body.userID });
    if (findUser) {
      return h.response("User already created");
    }
    var a = await new UserModel(body).save();
    return h.response("Create user successfully");
  } catch (error) {
    console.log(error);
    return h.response("Create user fail");
  }
};

// Get a user by ID
export const getUser = async (request: Request, h: ResponseToolkit) => {
  try {
    var idUser = request.params.id;
    var findUser = await UserModel.find({ userID: idUser });
    if (findUser) {
      return h.response(findUser);
    }
    return h.response("Not found user");
  } catch (error) {
    console.log(error);
  }
};

// Get all users
export const getUsers = async (request: Request, h: ResponseToolkit) => {
  try {
    var idUser = request.params.id;
    var findUser = await UserModel.find({});
    if (findUser) {
      return h.response(findUser);
    }
    return h.response("Not found user");
  } catch (error) {
    console.log(error);
  }
};

// Update a user by ID
export const updateUser = async (request: Request, h: ResponseToolkit) => {
  try {
    var idUser = request.params.id;
    var findUser = await UserModel.findOneAndUpdate(
      { userID: idUser },
      { email: "updated@gmail.com" }
    );
    if (findUser) {
      return h.response("Update user successfully");
    }
    return h.response("Update user fail");
  } catch (error) {
    console.log(error);
  }
};

// Delete a user by ID
export const deleteUser = async (request: Request, h: ResponseToolkit) => {
  try {
    var idUser = request.params.id;
    var findUser = await UserModel.findOneAndDelete({ userID: idUser });
    if (findUser) {
      return h.response("Delete user successfully");
    }
    return h.response("Delete user fail");
  } catch (error) {
    console.log(error);
  }
};
