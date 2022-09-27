"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const eventSchema = new Schema({
    maxQuantityVoucher: {
        type: Number,
        require: true,
        unique: true
    },
    eventID: {
        type: String,
        require: true,
        unique: true
    },
    eventName: {
        type: String,
        require: true
    }
});
exports.EventModel = mongoose_1.default.model('event', eventSchema);
