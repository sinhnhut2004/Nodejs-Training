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
exports.updateEvent = exports.deleteEvent = exports.getEvents = exports.getEvent = exports.createEvent = exports.eventRoutes = void 0;
const joi_1 = __importDefault(require("joi"));
const eventModel_1 = require("../models/eventModel");
// validate by joi for request
const eventPayload = joi_1.default.object({
    idEvent: joi_1.default.string().required(),
    eventName: joi_1.default.string().required(),
    maxQuantityVoucher: joi_1.default.number().required(),
});
const eventRoutes = (server) => {
    server.route({
        method: "POST",
        path: "/event",
        options: {
            description: "Create new event",
            notes: "This route create new event",
            tags: ["api"],
            validate: {
                payload: eventPayload,
            },
        },
        handler: exports.createEvent,
    });
    server.route({
        method: "GET",
        path: "/event/{id}",
        options: {
            description: "GET A Event",
            notes: "This route GET A Event",
            tags: ["api"],
        },
        handler: exports.getEvent,
    });
    server.route({
        method: "GET",
        path: "/event",
        options: {
            description: "GET All Event",
            notes: "This route GET All Event",
            tags: ["api"],
        },
        handler: exports.getEvents,
    });
    server.route({
        method: "PUT",
        path: "/event/{id}",
        options: {
            description: "Update a event",
            notes: "This route Update a event",
            tags: ["api"],
        },
        handler: exports.updateEvent,
    });
    server.route({
        method: "DELETE",
        path: "/event/{id}",
        options: {
            description: "Delete event",
            notes: "This route delete event",
            tags: ["api"],
        },
        handler: exports.deleteEvent,
    });
};
exports.eventRoutes = eventRoutes;
// Create a new event
const createEvent = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var body = request.payload;
        var findEvent = yield eventModel_1.EventModel.findOne({ eventID: body.eventID });
        if (!findEvent) {
            var b = yield new eventModel_1.EventModel({
                maxQuantityVoucher: body.maxQuantityVoucher,
                maxQuantity: body.maxQuantityVoucher,
                idEvent: body.eventID,
                eventName: body.eventName,
            }).save();
            return h.response("Create event successfully");
        }
        return h.response("Create event fail");
    }
    catch (error) {
        console.log(error);
    }
});
exports.createEvent = createEvent;
// Get a event by ID
const getEvent = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var eventID = request.params.id;
        var findEvent = yield eventModel_1.EventModel.find({ eventID: eventID });
        if (findEvent) {
            return h.response(findEvent);
        }
        return h.response("Event not found");
    }
    catch (error) {
        console.log(error);
    }
});
exports.getEvent = getEvent;
// Get all events
const getEvents = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var body = request.payload;
        var findEvent = yield eventModel_1.EventModel.find({});
        if (findEvent) {
            return h.response(findEvent);
        }
        return h.response("Event not found");
    }
    catch (error) {
        console.log(error);
    }
});
exports.getEvents = getEvents;
// Delete a event by ID
const deleteEvent = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var body = request.payload;
        var findEvent = yield eventModel_1.EventModel.findOneAndRemove({
            eventID: body.eventID,
        });
        if (findEvent) {
            return h.response("Delete event successfully");
        }
        return h.response("Delete event fail");
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteEvent = deleteEvent;
// Update a event by ID
const updateEvent = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var body = request.payload;
        var findEvent = yield eventModel_1.EventModel.findOneAndUpdate({ eventID: body.eventID }, { maxQuantityVoucher: body.maxQuantityVoucher }).then(function () {
            return h.response("Update event successfully");
        });
        return h.response("Update event fail");
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateEvent = updateEvent;
