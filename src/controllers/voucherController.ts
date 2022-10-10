import { Server } from "@hapi/hapi";
import Joi from "joi";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { VoucherModel } from "../models/voucherModel";
import { IVoucher } from "../models/voucherModel";
import { EventModel } from "../models/eventModel";
import { startSession } from "mongoose";
import { uid } from "rand-token";
import { commitWithRetry } from "../configs/transaction";

// validate by joi for request
const voucherPayload = Joi.object({
  idEvent: Joi.string().required(),
  idUser: Joi.string().required(),
});

export const voucherRoutes = (server: Server) => {
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
    handler: createVoucher,
  });

  server.route({
    method: "GET",
    path: "/voucher/{idEvent}",
    options: {
      description: "GET A Voucher",
      notes: "This route GET A Voucher",
      tags: ["api"],
    },
    handler: getVoucherByID,
  });

  server.route({
    method: "GET",
    path: "/voucher",
    options: {
      description: "GET All Voucher",
      notes: "This route GET A Voucher",
      tags: ["api"],
    },
    handler: getVouchers,
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
    handler: updateVoucher,
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
    handler: deleteVoucher,
  });
};

// Create a new voucher
export const createVoucher = async (request: Request, h: ResponseToolkit) => {
  const session = await startSession();
  session.startTransaction();
  try {
    var body = <IVoucher>request.payload;
    var findEventID = await EventModel.find({ eventID: body.idEvent });
    var maxQuantity = <number>findEventID[0].maxQuantityRemain;
    // check voucher alrealdy create or not
    if (maxQuantity > 0) {
      var findVoucher = await VoucherModel.findOne({
        idEvent: body.idEvent,
        userID: body.idUser,
      });
      // update maxQuantityRemain
      if (!findVoucher) {
        var updateQuantity = await EventModel.findOneAndUpdate(
          { eventID: body.idEvent },
          { $inc: { maxQuantityRemain: -1 } }
        );
        var voucherCode = uid(6); // generate voucherCode
        var newVoucher = await new VoucherModel({
          voucherCode: voucherCode,
          idEvent: body.idEvent,
          dateExpire: "30/10/2022",
        }).save();
        await commitWithRetry(session);
        return h.response(newVoucher);
      }
    }
    return h.response("Create voucher fail");
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
  } finally {
    session.endSession();
  }
};

// Delete a voucher
export const deleteVoucher = async (request: Request, h: ResponseToolkit) => {
  try {
    var body = <IVoucher>request.payload;
    var findVoucher = await VoucherModel.findOneAndDelete({
      idEvent: body.idEvent,
      userID: body.idUser,
    });
    if (findVoucher) {
      return h.response("Delete voucher successfully");
    }
    return h.response("Delete voucher fail");
  } catch (error) {
    console.log(error);
  }
};

// Update voucher
export const updateVoucher = async (request: Request, h: ResponseToolkit) => {
  try {
    var idVoucher = request.params.idVoucher;
    var findVoucher = await VoucherModel.findOneAndUpdate(
      { voucherID: idVoucher },
      { voucherCode: "updatedVoucher" }
    );
    if (findVoucher) {
      return h.response("Update voucher successfully");
    }
    return h.response("Update voucher fail");
  } catch (error) {
    console.log(error);
  }
};

// Get voucher by ID event
export const getVoucherByID = async (request: Request, h: ResponseToolkit) => {
  try {
    var idEvent = <string>request.params.idEvent;
    var findEvent = await EventModel.find({ eventID: idEvent });
    if (findEvent) {
      var a = await VoucherModel.find({ idEvent: idEvent });
      return h.response(a);
    }
    return h.response("Not found voucher");
  } catch (error) {
    console.log(error);
  }
};

// Get all vouchers
export const getVouchers = async (request: Request, h: ResponseToolkit) => {
  try {
    var findEvent = await EventModel.find({});
    if (findEvent) {
      return h.response(findEvent);
    }
    return h.response("Not found Voucher ");
  } catch (error) {
    console.log(error);
  }
};
