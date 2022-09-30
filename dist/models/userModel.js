"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    userID: {
        type: String,
        require: true,
        unique: true
    },
    userName: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true
    }
});
exports.UserModel = mongoose_1.default.model('user', userSchema);
