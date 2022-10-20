import { Request, ResponseToolkit } from "@hapi/hapi";
import { IEditable, editableEvent } from "../models/editableModel";
import { EventModel } from "../models/eventModel";
import { startSession } from "mongoose";
import { commitWithRetry } from "../configs/transaction";
import { Server } from "@hapi/hapi";
import Joi from "joi";
import { Session } from "inspector";

const editablePayload = Joi.object({
  id_User: Joi.string().required(),
});

export const editableEventRoutes = (server: Server) => {
  server.route({
    method: "POST",
    path: "/events/{event_id}/editable/me",
    options: {
      description: "EDITABLE EVENT",
      notes: "Allow to edit an event if it editable",
      tags: ["api"],
      validate: {
        payload: editablePayload,
      },
    },
    handler: editableMe,
  });

  server.route({
    method: "POST",
    path: "/events/{event_id}/editable/release",
    options: {
      description: "Release an event",
      notes: "Release an event to editable event for other user",
      tags: ["api"],
    },
    handler: editableRelease,
  });

  server.route({
    method: "POST",
    path: "/events/{event_id}/editable/maintain",
    options: {
      description: "Reset time expired in the event",
      notes: "Reset time expired in the event",
      tags: ["api"],
    },
    handler: editableMaintain,
  });
};

export const editableMe = async (request: Request, h: ResponseToolkit) => {
  const session = await startSession();
  session.startTransaction();
  try {
    //receive event_id from params and id_user from req.body
    const eventID = request.params.event_id;
    const body = <IEditable>request.payload;
    //find and check if Event exist or not
    const findEvent = await EventModel.findOne({ eventID: eventID }).session(
      session
    );
    if (!findEvent) {
      session.endSession();
      return h.response({ message: "Event not found" });
    }
    //find and check if Editable Event exist or not
    const findEditableEvent = await editableEvent
      .findOne({ eventID: eventID })
      .session(session);
    if (!findEditableEvent) {
      const newEditableEvent = new editableEvent();
      newEditableEvent.eventID = eventID;
      newEditableEvent.userID = body.userID;
      newEditableEvent.editable = false;
      newEditableEvent.expired_time = new Date();
      await newEditableEvent.save({ session: session });
      await commitWithRetry(session);
      session.endSession();
      return h.response("You are allowed to Edit event").code(200);
    }
    //already have
    else if (findEditableEvent && findEditableEvent.editable == true) {
      const asignUser = await editableEvent.findOneAndUpdate(
        { eventID: eventID },
        { editable: false, userID: body.userID },
        { session: session }
      );
      await commitWithRetry(session);
      session.endSession();
      return h
        .response({
          message: "No one edit this Event. You are allowed to Edit",
          asignUser,
        })
        .code(200);
    }
    //some user are editting event
    else if (findEditableEvent && findEditableEvent.editable == false) {
      session.endSession();
      return h
        .response("Some one editing this Event. You not are allowed to Edit")
        .code(409);
    }
    await commitWithRetry(session);
    session.endSession();
  } catch (error) {
    session.endSession();
    console.log(error);
    return h.response("Error!!");
  }
};

export const editableRelease = async (request: Request, h: ResponseToolkit) => {
  try {
    //receive event_id from params
    const eventID = request.params.event_id;
    //find editable event existed or not
    const findEditAble = await editableEvent.findOne({ eventID: eventID });
    if (!findEditAble) {
      return h.response("Not found editable event").code(400);
    }
    //check if it release or not
    else if (findEditAble.editable == true) {
      return h.response("Event already released").code(400);
    }
    const releaseEvent = await editableEvent.findOneAndUpdate(
      { eventID: eventID },
      { userID: null, editable: true, expiredAt: new Date() }
    );
    return h.response("Release event successfully").code(200);
  } catch (error) {
    console.log(error);
    return h.response("Error!!");
  }
};

export const editableMaintain = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    //receive event_id from params
    const eventID = request.params.event_id;
    //find editable event exist or not
    const findEditAble = await editableEvent.findOneAndUpdate(
      { eventID: eventID },
      { expiredAt: new Date() },
      { new: true }
    );
    if (findEditAble) {
      return h.response({
        message: "There are user editing event so the event time reset",
      });
    }
    return h.response({ message: "Not found editable event" });
  } catch (error) {
    console.log(error);
    return h.response("Error!!");
  }
};
