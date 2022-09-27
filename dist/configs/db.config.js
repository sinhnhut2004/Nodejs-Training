"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = () => {
    mongoose_1.default.connect("mongodb+srv://anhchangcut:nhut.nguyenpro@cluster0.hg4krsi.mongodb.net/testDB");
    console.log("DB connected !!!");
};
exports.connectDb = connectDb;
