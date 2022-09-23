import { Request, ResponseToolkit } from "@hapi/hapi";
import { VoucherModel } from "../models/voucherModel";
export const createVoucher = async (request: Request, h: ResponseToolkit) => {
    try {
        return h.response("sinh nhut day");
    } catch (error) {
        console.log(error)
    }
    
}

export const findVoucher = () => {
    VoucherModel.find({}).then(function(data:object){
        console.log(data)
    }).catch(function(err:object){
        console.log(err)
    })
}
// deleteVoucher

// updateVoucher

// getVoucher