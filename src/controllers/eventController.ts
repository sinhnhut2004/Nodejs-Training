import { Server } from "@hapi/hapi";
import Joi from "joi";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { EventModel, IEvent } from "../models/eventModel";

// validate by joi for request
const eventPayload = Joi.object({
  idEvent: Joi.string().required(),
  eventName: Joi.string().required(),
  maxQuantityVoucher: Joi.number().required(),
});

export const eventRoutes = (server: Server) => {
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
    handler: createEvent,
  });

  server.route({
    method: "GET",
    path: "/event/{id}",
    options: {
      description: "GET A Event",
      notes: "This route GET A Event",
      tags: ["api"],
    },
    handler: getEvent,
  });

  server.route({
    method: "GET",
    path: "/event",
    options: {
      description: "GET All Event",
      notes: "This route GET All Event",
      tags: ["api"],
    },
    handler: getEvents,
  });

  server.route({
    method: "PUT",
    path: "/event/{id}",
    options: {
      description: "Update a event",
      notes: "This route Update a event",
      tags: ["api"],
    },
    handler: updateEvent,
  });

  server.route({
    method: "DELETE",
    path: "/event/{id}",
    options: {
      description: "Delete event",
      notes: "This route delete event",
      tags: ["api"],
    },
    handler: deleteEvent,
  });
};

// Create a new event
export const createEvent = async (request: Request, h: ResponseToolkit) => {
  try {
    var body = <IEvent>request.payload;
    var findEvent = await EventModel.findOne({ eventID: body.eventID });
    if (!findEvent) {
      var b = await new EventModel({
        maxQuantityVoucher: body.maxQuantityVoucher,
        maxQuantity: body.maxQuantityVoucher,
        idEvent: body.eventID,
        eventName: body.eventName,
      }).save();
      return h.response("Create event successfully");
    }
    return h.response("Create event fail");
  } catch (error) {
    console.log(error);
  }
};

// Get a event by ID
export const getEvent = async (request: Request, h: ResponseToolkit) => {
  try {
    var eventID = request.params.id;
    var findEvent = await EventModel.find({ eventID: eventID });
    if (findEvent) {
      return h.response(findEvent);
    }
    return h.response("Event not found");
  } catch (error) {
    console.log(error);
  }
};

// Get all events
export const getEvents = async (request: Request, h: ResponseToolkit) => {
  try {
    var body = <IEvent>request.payload;
    var findEvent = await EventModel.find({});
    if (findEvent) {
      return h.response(findEvent);
    }
    return h.response("Event not found");
  } catch (error) {
    console.log(error);
  }
};

// Delete a event by ID
export const deleteEvent = async (request: Request, h: ResponseToolkit) => {
  try {
    var body = <IEvent>request.payload;
    var findEvent = await EventModel.findOneAndRemove({
      eventID: body.eventID,
    });
    if (findEvent) {
      return h.response("Delete event successfully");
    }
    return h.response("Delete event fail");
  } catch (error) {
    console.log(error);
  }
};

// Update a event by ID
export const updateEvent = async (request: Request, h: ResponseToolkit) => {
  try {
    var body = <IEvent>request.payload;
    var findEvent = await EventModel.findOneAndUpdate(
      { eventID: body.eventID },
      { maxQuantityVoucher: body.maxQuantityVoucher }
    ).then(function () {
      return h.response("Update event successfully");
    });
    return h.response("Update event fail");
  } catch (error) {
    console.log(error);
  }
};
