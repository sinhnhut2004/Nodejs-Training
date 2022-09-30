import { Server } from "@hapi/hapi";
import Joi from "joi";
import { createEvent, getEvent, getEvents, updateEvent, deleteEvent } from "../services/eventService";


const eventPayload = Joi.object({
    idEvent: Joi.string().required(), 
    eventName: Joi.string().required(),
    maxQuantityVoucher: Joi.number().required()
});

    // create event
export const eventRoutes = (server: Server) => {
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
        handler: createEvent
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
        handler: getEvent
    });

    //get all events
    server.route({
        method: "GET",
        path: "/voucher",
        options: {
            description: 'GET All Event',
            notes: 'This route GET All Event',
            tags: ['api']
        },
        handler: getEvents
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
        handler: updateEvent
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
        handler: deleteEvent
    });

}