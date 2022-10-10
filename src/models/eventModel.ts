import mongoose from "mongoose";

export interface IEvent {
  maxQuantityVoucher: Number;
  eventID: String;
  eventName: String;
}

const Schema = mongoose.Schema;
const eventSchema = new Schema({
  maxQuantityVoucher: {
    type: Number,
    require: true,
    unique: true,
  },
  maxQuantityRemain:{
    type: Number,
    require: true,
    unique: true,
  },
  eventID: {
    type: String,
    require: true,
    unique: true,
  },
  eventName: {
    type: String,
    require: true,
  },
});
export const EventModel = mongoose.model("event", eventSchema);
