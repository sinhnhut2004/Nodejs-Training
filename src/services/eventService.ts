import { Request, ResponseToolkit } from "@hapi/hapi";
import { EventModel, IEvent } from "../models/eventModel";

// create event
export const createEvent = async (request: Request, h: ResponseToolkit) => {

    try {
        var body = <IEvent>request.payload;
        var findEvent = await EventModel.findOne({"eventID": body.eventID});
        if(!findEvent){
            var b = await new EventModel({
                maxQuantityVoucher: body.maxQuantityVoucher,
                idEvent: body.eventID,
                eventName: body.eventName
            }).save();
            return h.response("tao event thanh cong");
        }
        return h.response("tao event khong thanh cong");
        
    } catch (error) {
        console.log(error);
    }
}

// delete event
export const deleteEvent = async (request: Request, h: ResponseToolkit) => {
    try {
        var body = <IEvent>request.payload;
        var findEvent = await EventModel.findOneAndRemove({"eventID": body.eventID});
        if(findEvent){
            return h.response("xoa thanh cong event");
        }
        return h.response("xoa event that bai");
    } catch (error) {
        console.log(error);
    }
}

// update event

export const updateEvent = async (request: Request, h: ResponseToolkit) => {

    try {
        var body = <IEvent>request.payload;
        var findEvent = await EventModel.findOneAndUpdate({"eventID": body.eventID}, {"maxQuantityVoucher": body.maxQuantityVoucher}).then(function(){
            return h.response("update event thanh cong");
        })
        return h.response("update event that bai");
    } catch (error) {
        console.log(error);
    }
}

export const getEvent = async (request: Request, h: ResponseToolkit) => {

    try {
        var body = <IEvent>request.payload;
        var findEvent = await EventModel.find({"eventID": body.eventID}).then(function(data){
            return h.response(data);
        })
        return h.response("get event that bai");
    } catch (error) {
        console.log(error);
    }
}

export const getEvents = async (request: Request, h: ResponseToolkit) => {

    try {
        var body = <IEvent>request.payload;
        var findEvent = await EventModel.find({}).then(function(data){
            return h.response(data);
        })
        return h.response("get event that bai");
    } catch (error) {
        console.log(error);
    }
}