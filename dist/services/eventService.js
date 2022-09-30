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
exports.updateEvent = exports.deleteEvent = exports.createEvent = void 0;
const eventModel_1 = require("../models/eventModel");
// create event
const createEvent = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var body = request.payload;
        var findEvent = yield eventModel_1.EventModel.findOne({ "eventID": body.eventID });
        if (!findEvent) {
            var b = yield new eventModel_1.EventModel({
                maxQuantityVoucher: body.maxQuantityVoucher,
                idEvent: body.eventID,
                eventName: body.eventName
            }).save();
            return h.response("tao event thanh cong");
        }
        return h.response("tao event khong thanh cong");
    }
    catch (error) {
        console.log(error);
    }
});
exports.createEvent = createEvent;
// delete event
const deleteEvent = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var body = request.payload;
        var findEvent = yield eventModel_1.EventModel.findOneAndRemove({ "eventID": body.eventID });
        if (findEvent) {
            return h.response("xoa thanh cong event");
        }
        return h.response("xoa event that bai");
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteEvent = deleteEvent;
// update event
const updateEvent = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var body = request.payload;
        var findEvent = yield eventModel_1.EventModel.findOneAndUpdate({ "eventID": body.eventID }, { "maxQuantityVoucher": body.maxQuantityVoucher }).then(function () {
            return h.response("update event thanh cong");
        });
        return h.response("update event that bai");
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateEvent = updateEvent;
