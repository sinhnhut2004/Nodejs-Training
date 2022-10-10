"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editableMaintain = exports.editableRelease = exports.editableMe = exports.editableEventRoutes = void 0;
const joi_1 = __importDefault(require("joi"));
const editablePayload = joi_1.default.object({
    id_User: joi_1.default.string().required(),
});
const editableEventRoutes = (server) => {
    server.route({
        method: "POST",
        path: "/events/{event_id}/editable/me",
        options: {
            description: 'EDITABLE EVENT',
            notes: 'Enter to edit an event if it editable',
            tags: ['api'],
            validate: {
                payload: editablePayload,
            }
        },
        handler: exports.editableMe
    });
    server.route({
        method: "POST",
        path: "/events/{event_id}/editable/release",
        options: {
            description: 'Release an event',
            notes: 'Release an event for other user to edit',
            tags: ['api']
        },
        handler: exports.editableRelease
    });
    server.route({
        method: "POST",
        path: "/events/{event_id}/editable/maintain",
        options: {
            description: 'Reset time expired in the event',
            notes: 'Reset time expired in the event',
            tags: ['api']
        },
        handler: exports.editableMaintain
    });
};
exports.editableEventRoutes = editableEventRoutes;
const editableMe = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.editableMe = editableMe;
const editableRelease = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.editableRelease = editableRelease;
const editableMaintain = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.editableMaintain = editableMaintain;
