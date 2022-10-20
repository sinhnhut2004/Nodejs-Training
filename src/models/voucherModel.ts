import mongoose from "mongoose";

export interface IVoucher {
  eventID: String;
  userID: String;
}
const Schema = mongoose.Schema;
const voucherSchema = new Schema({
  voucherCode: {
    type: String,
    require: true,
    unique: true,
  },
  eventID: {
    type: String,
    require: true,
  },
  userID: {
    type: String,
    require: true,
  },
  dateExpire: {
    type: String,
    require: true,
  },
});
export const VoucherModel = mongoose.model("voucher", voucherSchema);
