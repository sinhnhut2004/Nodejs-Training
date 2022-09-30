"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRoutes = void 0;
const joi_1 = __importDefault(require("joi"));
const eventService_1 = require("../services/eventService");
const eventPayload = joi_1.default.object({
    idEvent: joi_1.default.string().required(),
    eventName: joi_1.default.string().required(),
    maxQuantityVoucher: joi_1.default.number().required()
});
// create event
const eventRoutes = (server) => {
    server.route({
        method: "POST",
        path: "/event",
        options: {
            description: 'Create new event',
            notes: 'This route create new event',
            tags: ['api'],
            validate: {
                payload: eventPayload,
            }
        },
        handler: eventService_1.createEvent
    });
    //get a event by id event
    server.route({
        method: "GET",
        path: "/event/{idEvent}",
        options: {
            description: 'GET A Event',
            notes: 'This route GET A Event',
            tags: ['api']
        },
        handler: eventService_1.getEvent
    });
    //get all events
    server.route({
        method: "GET",
        path: "/event",
        options: {
            description: 'GET All Event',
            notes: 'This route GET All Event',
            tags: ['api']
        },
        handler: eventService_1.getEvents
    });
    //update a event
    server.route({
        method: "PUT",
        path: "/event/{id}",
        options: {
            description: 'Update a event',
            notes: 'This route Update a event',
            tags: ['api']
        },
        handler: eventService_1.updateEvent
    });
    //delete event
    server.route({
        method: "DELETE",
        path: "/event/{id}",
        options: {
            description: 'Delete event',
            notes: 'This route delete event',
            tags: ['api']
        },
        handler: eventService_1.deleteEvent
    });
};
exports.eventRoutes = eventRoutes;
