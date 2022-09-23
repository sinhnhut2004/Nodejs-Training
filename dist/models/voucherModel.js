"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoucherModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const hello = new Schema({
    username: String,
    password: String
});
exports.VoucherModel = mongoose_1.default.model('account', hello);
/*export const findVoucher = () => {

    const Schema = mongoose.Schema;
    const hello = new Schema({
      username: String,
      password: String
    });
    const AccountModel = mongoose.model("account", hello);
    AccountModel.find({}).then(function(data:object){
        console.log(data)
    }).catch(function(err:object){
        console.log(err)
    })
}*/
