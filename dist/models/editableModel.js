"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editableEvent = void 0;
const mongoose_1 = require("mongoose");
const editableSchema = new mongoose_1.Schema({
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
    expiredAt: {
        type: Date,
        default: Date.now,
        expires: 300,
    }
});
exports.editableEvent = (0, mongoose_1.model)("editableEvent", editableSchema);
