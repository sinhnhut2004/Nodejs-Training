import mongoose from "mongoose";

export interface IVoucher {
  idEvent: String;
  idUser: String;
}
const Schema = mongoose.Schema;
const voucherSchema = new Schema({
  voucherCode: {
    type: String,
    require: true,
    unique: true,
  },
  idEvent: {
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
