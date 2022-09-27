import { Request, ResponseToolkit } from "@hapi/hapi";
import { VoucherModel } from "../models/voucherModel";
import { IVoucher } from "../models/voucherModel";
import { EventModel } from "../models/eventModel";
import { object } from "joi";
import { startSession } from "mongoose";

// create voucher
export const createVoucher = async (request: Request, h: ResponseToolkit) => {

    const session = await startSession();
    session.startTransaction();
    try {
        var body = <IVoucher>request.payload;
        // kiem tra xem idevent có tồn tại không ?
        // kiểm tra xem maxVoucher ứng với idEvent còn trong db không ?
        // kiểm tra xem khách hàng này đã có voucher cho sự kiện này chưa ?
        // Lưu voucherCode bằng idUser
        var maxQuantity = 0 ;
        var findEventID =  await EventModel.find({"eventID":body.idEvent}).then(function(data) {
            maxQuantity= <number>data[0].maxQuantityVoucher;
        })
        if(maxQuantity > 0) {         // check quantity
            // gan idUser = voucherCode
            var findVoucher =  await VoucherModel.findOne({"voucherCode":body.idUser})
            if(!findVoucher){
                var updateQuantity = await EventModel.findOneAndUpdate({"eventID": body.idEvent},  { $inc: { maxQuantityVoucher: -1 } });
                // create Voucher
                var b = await new VoucherModel({
                    voucherCode: body.idUser,
                    idEvent: body.idEvent,
                    dateExpire: "30/10/2022"
                }).save();
                return h.response("tao thanh cong voucher");
            }          
        }
        return h.response("that bai"); 
    } catch (error) {
        console.log(error)
    }
    finally {
        session.endSession();
    }
}

// deleteVoucher
export const deleteVoucher = async (request: Request, h: ResponseToolkit) => {
    try {
        return h.response("day la api deleteVoucher");
    } catch (error) {
        console.log(error)
    }
    
}

// update voucher

export const updateVoucher = async (request: Request, h: ResponseToolkit) => {
    try {
        return h.response("day la api updateVoucher");
    } catch (error) {
        console.log(error)
    }
    
}

// get voucher
export const getVoucher = async (request: Request, h: ResponseToolkit) => {
    try {
        return h.response("day la api getVoucher");
    } catch (error) {
        console.log(error)
    }
    
}
