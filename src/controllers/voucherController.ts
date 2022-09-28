import { Server } from "@hapi/hapi";
import Joi from "joi";
import { createVoucher, getVoucher, updateVoucher, deleteVoucher } from "../services/voucherService"

const voucherPayload = Joi.object({
    idEvent: Joi.string().required(), 
    idUser: Joi.string().required()
});

    // create voucher
export const voucherRoutes = (server: Server) => {
    server.route({
        method: "POST",
        path: "/voucher",
        options: {
            description: 'Create new voucher',
            notes: 'This route create new voucher',
            tags: ['api'],
            validate: {
                payload: voucherPayload,
            }
        },
        handler: createVoucher
    });

    //get a voucher by id event
    // server.route({
    //     method: "GET",
    //     path: "/voucher/{idEvent}",
    //     options: {
    //         description: 'GET A Voucher',
    //         notes: 'This route GET A Voucher',
    //         tags: ['api']
    //     },
    //     handler: getVoucher
    // });

    //update a voucher
    // server.route({
    //     method: "PUT",
    //     path: "/voucher/{id}",
    //     options: {
    //         description: 'Update a voucher',
    //         notes: 'This route Update a voucher',
    //         tags: ['api']
    //     },
    //     handler: updateVoucher
    // });

    //delete voucher
    server.route({
        method: "DELETE",
        path: "/voucher/{id}",
        options: {
            description: 'Delete voucher',
            notes: 'This route delete voucher',
            tags: ['api']
        },
        handler: deleteVoucher
    });

}