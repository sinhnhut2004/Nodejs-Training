import mongoose from 'mongoose'

export interface IUser {
  userID: String,
  userName: String,
  email: String
}

const Schema = mongoose.Schema;
const eventSchema = new Schema({
    maxQuantityVoucher: {
      type: Number,
      require: true,
      unique: true
    },
    eventID: {
      type: String,
      require: true,
      unique: true
    },
    eventName: {
      type: String,
      require: true
    }
  });
export const EventModel = mongoose.model('event', eventSchema);