import { Request, ResponseToolkit } from "@hapi/hapi";
import { UserModel, IUser } from "../models/userModel";

export const createUser = async (request: Request, h: ResponseToolkit) => {
    try {
        var body = <IUser>request.payload;
        var findUser = await UserModel.findOne({"userID": body.userID})
        if(findUser){
            return h.response("User da ton tai");
        }
        var a = await new UserModel(body).save();
        return h.response("tao thanh cong User");
        
    } catch (error) {
        console.log(error);
    }
}

export const getUser = async (request: Request, h: ResponseToolkit) => {
    try {
        var idUser = request.params.idUser;
        var findUser = await UserModel.find({"userID": idUser}).then(function(data){
            return h.response(data);
        })
        return h.response("Khong tim thay User");
        
    } catch (error) {
        console.log(error);
    }
}


export const getUsers = async (request: Request, h: ResponseToolkit) => {
    try {
        var idUser = request.params.idUser;
        var findUser = await UserModel.find({}).then(function(data){
            return h.response(data);
        })
        return h.response("Khong tim thay User");
        
    } catch (error) {
        console.log(error);
    }
}


export const updateUser = async (request: Request, h: ResponseToolkit) => {
    try {
        var idUser = request.params.idUser;
        var findUser = await UserModel.findOneAndUpdate({"userID": idUser}).then(function(data){
            return h.response("cap nhat nhat User thanh cong");
        })
        return h.response("Cap nhat user khong thanh cong");
        
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async (request: Request, h: ResponseToolkit) => {
    try {
        var idUser = request.params.idUser;
        var findUser = await UserModel.findOneAndDelete({"userID": idUser}).then(function(data){
            return h.response("Delete User thanh cong");
        })
        return h.response("Delete User that bai");
        
    } catch (error) {
        console.log(error);
    }
}

