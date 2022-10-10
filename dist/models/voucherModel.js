"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoucherModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const voucherSchema = new Schema({
    voucherCode: {
        type: String,
        require: true,
        unique: true,
    },
    idEvent: {
        type: String,
        require: true,
    },
    userID: {
        type: String,
        require: true,
    },
    dateExpire: {
        type: String,
        require: true,
    },
});
exports.VoucherModel = mongoose_1.default.model("voucher", voucherSchema);
