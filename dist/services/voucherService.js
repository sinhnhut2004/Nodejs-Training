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
exports.getVouchers = exports.getVoucherByID = exports.updateVoucher = exports.deleteVoucher = exports.createVoucher = void 0;
const voucherModel_1 = require("../models/voucherModel");
const eventModel_1 = require("../models/eventModel");
const mongoose_1 = require("mongoose");
// create voucher
const createVoucher = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    session.startTransaction();
    try {
        var body = request.payload;
        // kiem tra xem idevent có tồn tại không ?
        // kiểm tra xem maxVoucher ứng với idEvent còn trong db không ?
        // kiểm tra xem khách hàng này đã có voucher cho sự kiện này chưa ?
        // Lưu voucherCode bằng idUser
        var maxQuantity = 0;
        var findEventID = yield eventModel_1.EventModel.find({ "eventID": body.idEvent }).then(function (data) {
            maxQuantity = data[0].maxQuantityVoucher;
        });
        if (maxQuantity > 0) { // check quantity
            // gan idUser = voucherCode
            var findVoucher = yield voucherModel_1.VoucherModel.findOne({ "voucherCode": body.idUser });
            if (!findVoucher) {
                var updateQuantity = yield eventModel_1.EventModel.findOneAndUpdate({ "eventID": body.idEvent }, { $inc: { maxQuantityVoucher: -1 } });
                // create Voucher
                var b = yield new voucherModel_1.VoucherModel({
                    voucherCode: body.idUser,
                    idEvent: body.idEvent,
                    dateExpire: "30/10/2022"
                }).save();
                return h.response("tao thanh cong voucher");
            }
        }
        return h.response("tao voucher that bai");
    }
    catch (error) {
        console.log(error);
    }
    finally {
        session.endSession();
    }
});
exports.createVoucher = createVoucher;
// deleteVoucher
const deleteVoucher = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var body = request.payload;
        var a = request.params.id;
        var findVoucher = yield voucherModel_1.VoucherModel.findOneAndDelete({ "voucherCode": a });
        if (findVoucher) {
            return h.response("xoa thanh cong voucher");
        }
        return h.response("xoa voucher that bai");
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteVoucher = deleteVoucher;
// update voucher
const updateVoucher = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var body = request.payload;
        var findVoucher = yield voucherModel_1.VoucherModel.findOneAndUpdate({ "voucherCode": body.idUser }, { "voucherCode": "updatedVoucher" });
        if (findVoucher) {
            return h.response("cap nhat voucher thanh cong");
        }
        return h.response("cap nhat voucher that bai");
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateVoucher = updateVoucher;
// get voucher
const getVoucherByID = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var idEvent = request.params.idEvent;
        var findEvent = yield eventModel_1.EventModel.find({ "eventID": idEvent });
        if (findEvent) {
            var a = yield voucherModel_1.VoucherModel.find({ "idEvent": idEvent });
            return h.response(a);
        }
        return h.response("Khong tim thay voucher");
    }
    catch (error) {
        console.log(error);
    }
});
exports.getVoucherByID = getVoucherByID;
// get all voucher
const getVouchers = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //var body = <IVoucher>request.payload;
        var idEvent = request.params.idEvent;
        var findEvent = yield eventModel_1.EventModel.find({ "eventID": idEvent });
        if (findEvent) {
            var a = voucherModel_1.VoucherModel.find({});
            return h.response(a);
        }
        return h.response("khong tim thay Voucher");
    }
    catch (error) {
        console.log(error);
    }
});
exports.getVouchers = getVouchers;
