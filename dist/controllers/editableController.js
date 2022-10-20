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
exports.editableMaintain = exports.editableRelease = exports.editableMe = exports.editableEventRoutes = void 0;
const editableModel_1 = require("../models/editableModel");
const eventModel_1 = require("../models/eventModel");
const mongoose_1 = require("mongoose");
const transaction_1 = require("../configs/transaction");
const joi_1 = __importDefault(require("joi"));
const editablePayload = joi_1.default.object({
    id_User: joi_1.default.string().required(),
});
const editableEventRoutes = (server) => {
    server.route({
        method: "POST",
        path: "/events/{event_id}/editable/me",
        options: {
            description: 'EDITABLE EVENT',
            notes: 'Allow to edit an event if it editable',
            tags: ['api'],
            validate: {
                payload: editablePayload,
            }
        },
        handler: exports.editableMe
    });
    server.route({
        method: "POST",
        path: "/events/{event_id}/editable/release",
        options: {
            description: 'Release an event',
            notes: 'Release an event to editable event for other user',
            tags: ['api']
        },
        handler: exports.editableRelease
    });
    server.route({
        method: "POST",
        path: "/events/{event_id}/editable/maintain",
        options: {
            description: 'Reset time expired in the event',
            notes: 'Reset time expired in the event',
            tags: ['api']
        },
        handler: exports.editableMaintain
    });
};
exports.editableEventRoutes = editableEventRoutes;
const editableMe = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    session.startTransaction();
    try {
        //receive event_id from params and id_user from req.body
        const eventID = request.params.event_id;
        const body = request.payload;
        //find and check if Event exist or not
        const findEvent = yield eventModel_1.EventModel.findOne({ eventID: eventID });
        if (!findEvent) {
            return h.response({ message: "Event not found" });
        }
        //find and check if Editable Event exist or not
        const findEditableEvent = yield editableModel_1.editableEvent.findOne({ eventID: eventID });
        if (!findEditableEvent) {
            const newEditableEvent = new editableModel_1.editableEvent();
            newEditableEvent.eventID = eventID;
            newEditableEvent.userID = body.userID;
            newEditableEvent.editable = false;
            newEditableEvent.expired_time = new Date();
            yield newEditableEvent.save();
            return h.response("You are allowed to Edit event").code(200);
        }
        //already have 
        else if (findEditableEvent && findEditableEvent.editable == true) {
            const asignUser = yield editableModel_1.editableEvent.findOneAndUpdate({ eventID: eventID }, { editable: false, userID: body.userID }, { new: true });
            return h.response({ message: "No one edit this Event. You are allowed to Edit", asignUser }).code(200);
        }
        //some user are editting event
        else if (findEditableEvent && findEditableEvent.editable == false) {
            return h.response("Some one editing this Event. You not are allowed to Edit").code(409);
        }
        yield (0, transaction_1.commitWithRetry)(session);
    }
    catch (error) {
        console.log(error);
        return h.response("Error!!");
    }
    finally {
        session.endSession();
    }
});
exports.editableMe = editableMe;
const editableRelease = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //receive event_id from params
        const eventID = request.params.event_id;
        //find editable event existed or not
        const findEditAble = yield editableModel_1.editableEvent.findOne({ eventID: eventID });
        if (!findEditAble) {
            return h.response("Not found editable event").code(400);
        }
        //check if it release or not
        else if (findEditAble.editable == true) {
            return h.response("Event already released").code(400);
        }
        const releaseEvent = yield editableModel_1.editableEvent.findOneAndUpdate({ eventID: eventID }, { userID: null, editable: true, expiredAt: new Date() }, { new: true });
        return h.response("Release event successfully").code(200);
    }
    catch (error) {
        console.log(error);
        return h.response("Error!!");
    }
});
exports.editableRelease = editableRelease;
const editableMaintain = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //receive event_id from params
        const eventID = request.params.event_id;
        //find editable event exist or not
        const findEditAble = yield editableModel_1.editableEvent.findOneAndUpdate({ eventID: eventID }, { expiredAt: new Date() }, { new: true });
        if (findEditAble) {
            return h.response("There are user editing event so the event time reset");
        }
        return h.response({ message: "Not found editable event" });
    }
    catch (error) {
        console.log(error);
        return h.response("Error!!");
    }
});
exports.editableMaintain = editableMaintain;
