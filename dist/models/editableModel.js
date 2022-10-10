"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editableEvent = void 0;
const mongoose_1 = require("mongoose");
const editableSchema = new mongoose_1.Schema({
    id_Event: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    id_User: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    editable: {
        type: Boolean,
        required: true
    },
    expired_time: {
        type: Date,
        default: Date.now,
        expires: 300,
    }
});
exports.editableEvent = (0, mongoose_1.model)("EditableEvent", editableSchema);
