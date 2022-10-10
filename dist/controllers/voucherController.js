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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVouchers = exports.getVoucherByID = exports.updateVoucher = exports.deleteVoucher = exports.createVoucher = exports.voucherRoutes = void 0;
const joi_1 = __importDefault(require("joi"));
const voucherModel_1 = require("../models/voucherModel");
const eventModel_1 = require("../models/eventModel");
const mongoose_1 = require("mongoose");
const rand_token_1 = require("rand-token");
const transaction_1 = require("../configs/transaction");
// validate by joi for request
const voucherPayload = joi_1.default.object({
    idEvent: joi_1.default.string().required(),
    idUser: joi_1.default.string().required(),
});
const voucherRoutes = (server) => {
    server.route({
        method: "POST",
        path: "/voucher",
        options: {
            description: "Create new voucher",
            notes: "This route create new voucher",
            tags: ["api"],
            validate: {
                payload: voucherPayload,
            },
        },
        handler: exports.createVoucher,
    });
    server.route({
        method: "GET",
        path: "/voucher/{idEvent}",
        options: {
            description: "GET A Voucher",
            notes: "This route GET A Voucher",
            tags: ["api"],
        },
        handler: exports.getVoucherByID,
    });
    server.route({
        method: "GET",
        path: "/voucher",
        options: {
            description: "GET All Voucher",
            notes: "This route GET A Voucher",
            tags: ["api"],
        },
        handler: exports.getVouchers,
    });
    server.route({
        method: "PUT",
        path: "/voucher",
        options: {
            description: "Update a voucher",
            notes: "This route Update a voucher",
            tags: ["api"],
            validate: {
                payload: voucherPayload,
            },
        },
        handler: exports.updateVoucher,
    });
    server.route({
        method: "DELETE",
        path: "/voucher/",
        options: {
            description: "Delete voucher",
            notes: "This route delete voucher",
            tags: ["api"],
            validate: {
                payload: voucherPayload,
            },
        },
        handler: exports.deleteVoucher,
    });
};
exports.voucherRoutes = voucherRoutes;
// Create a new voucher
const createVoucher = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    session.startTransaction();
    try {
        var body = request.payload;
        var findEventID = yield eventModel_1.EventModel.find({ eventID: body.idEvent });
        var maxQuantity = findEventID[0].maxQuantityRemain;
        // check voucher alrealdy create or not
        if (maxQuantity > 0) {
            var findVoucher = yield voucherModel_1.VoucherModel.findOne({
                idEvent: body.idEvent,
                userID: body.idUser,
            });
            // update maxQuantityRemain
            if (!findVoucher) {
                var updateQuantity = yield eventModel_1.EventModel.findOneAndUpdate({ eventID: body.idEvent }, { $inc: { maxQuantityRemain: -1 } });
                var voucherCode = (0, rand_token_1.uid)(6); // generate voucherCode
                var newVoucher = yield new voucherModel_1.VoucherModel({
                    voucherCode: voucherCode,
                    idEvent: body.idEvent,
                    dateExpire: "30/10/2022",
                }).save();
                yield (0, transaction_1.commitWithRetry)(session);
                return h.response(newVoucher);
            }
        }
        return h.response("Create voucher fail");
    }
    catch (error) {
        yield session.abortTransaction();
        console.log(error);
    }
    finally {
        session.endSession();
    }
});
exports.createVoucher = createVoucher;
// Delete a voucher
const deleteVoucher = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var body = request.payload;
        var findVoucher = yield voucherModel_1.VoucherModel.findOneAndDelete({
            idEvent: body.idEvent,
            userID: body.idUser,
        });
        if (findVoucher) {
            return h.response("Delete voucher successfully");
        }
        return h.response("Delete voucher fail");
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteVoucher = deleteVoucher;
// Update voucher
const updateVoucher = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var idVoucher = request.params.idVoucher;
        var findVoucher = yield voucherModel_1.VoucherModel.findOneAndUpdate({ voucherID: idVoucher }, { voucherCode: "updatedVoucher" });
        if (findVoucher) {
            return h.response("Update voucher successfully");
        }
        return h.response("Update voucher fail");
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateVoucher = updateVoucher;
// Get voucher by ID event
const getVoucherByID = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var idEvent = request.params.idEvent;
        var findEvent = yield eventModel_1.EventModel.find({ eventID: idEvent });
        if (findEvent) {
            var a = yield voucherModel_1.VoucherModel.find({ idEvent: idEvent });
            return h.response(a);
        }
        return h.response("Not found voucher");
    }
    catch (error) {
        console.log(error);
    }
});
exports.getVoucherByID = getVoucherByID;
// Get all vouchers
const getVouchers = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var findEvent = yield eventModel_1.EventModel.find({});
        if (findEvent) {
            return h.response(findEvent);
        }
        return h.response("Not found Voucher ");
    }
    catch (error) {
        console.log(error);
    }
});
exports.getVouchers = getVouchers;
