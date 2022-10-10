import {Document, model, Schema} from "mongoose";

export interface IEditable {
    eventID: String,
    userID: String,
    expireAt: Date,
    editable: Boolean
}

const editableSchema : Schema = new Schema({
    eventID: {
        type: String,
        required: true,
        unique: true,
    },
    userID: {
        type: String,
        required: true
    },
    editable: {
        type: Boolean,
        required: true
    },
    expiredAt:{
        type: Date,
        default: Date.now,
        expires: 300,
    }
});

export const editableEvent = model("editableEvent", editableSchema);