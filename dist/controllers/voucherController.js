"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.voucherRoutes = void 0;
const joi_1 = __importDefault(require("joi"));
const voucherService_1 = require("../services/voucherService");
const voucherPayload = joi_1.default.object({
    idEvent: joi_1.default.string().required(),
    idUser: joi_1.default.string().required()
});
// create voucher
const voucherRoutes = (server) => {
    server.route({
        method: "POST",
        path: "/voucher",
        options: {
            description: 'Create new voucher',
            notes: 'This route create new voucher',
            tags: ['api'],
            validate: {
                payload: voucherPayload,
            }
        },
        handler: voucherService_1.createVoucher
    });
    //get a voucher by id event
    server.route({
        method: "GET",
        path: "/voucher/{idEvent}",
        options: {
            description: 'GET A Voucher',
            notes: 'This route GET A Voucher',
            tags: ['api']
        },
        handler: voucherService_1.getVoucherByID
    });
    //get a vouchers
    server.route({
        method: "GET",
        path: "/voucher",
        options: {
            description: 'GET All Voucher',
            notes: 'This route GET A Voucher',
            tags: ['api']
        },
        handler: voucherService_1.getVouchers
    });
    //update a voucher
    server.route({
        method: "PUT",
        path: "/voucher/{id}",
        options: {
            description: 'Update a voucher',
            notes: 'This route Update a voucher',
            tags: ['api']
        },
        handler: voucherService_1.updateVoucher
    });
    //delete voucher
    server.route({
        method: "DELETE",
        path: "/voucher/{id}",
        options: {
            description: 'Delete voucher',
            notes: 'This route delete voucher',
            tags: ['api']
        },
        handler: voucherService_1.deleteVoucher
    });
};
exports.voucherRoutes = voucherRoutes;
