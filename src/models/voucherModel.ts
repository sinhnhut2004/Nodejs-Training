import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const voucherSchema = new Schema({
    voucherCode: {
      type: String,
      require: true,
      unique: true
    },
    idEvent: {
      type: String,
      require: true
    },
    dateExpire: {
      type: Date,
      require: true
    }
  });
export const VoucherModel = mongoose.model('account', voucherSchema);



