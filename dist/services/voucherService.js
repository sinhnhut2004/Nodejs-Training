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
exports.findVoucher = exports.createVoucher = void 0;
const voucherModel_1 = require("../models/voucherModel");
const createVoucher = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return h.response("sinh nhut day");
    }
    catch (error) {
        console.log(error);
    }
});
exports.createVoucher = createVoucher;
const findVoucher = () => {
    voucherModel_1.VoucherModel.find({}).then(function (data) {
        console.log(data);
    }).catch(function (err) {
        console.log(err);
    });
};
exports.findVoucher = findVoucher;
// deleteVoucher
// updateVoucher
// getVoucher
