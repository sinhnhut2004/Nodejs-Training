"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.voucherRoutes = exports.start = void 0;
const Hapi = __importStar(require("@hapi/hapi"));
const HapiSwagger = __importStar(require("hapi-swagger"));
const inert_1 = __importDefault(require("@hapi/inert"));
const vision_1 = __importDefault(require("@hapi/vision"));
const joi_1 = __importDefault(require("joi"));
const voucherService_1 = require("./voucherService");
// code omitted for brevity
const voucherPayload = joi_1.default.object({
    voucherName: joi_1.default.string(),
    idEvent: joi_1.default.string().required()
});
const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const swaggerOptions = {
        info: {
            title: 'Test API Documentation'
        }
    };
    const plugins = [
        {
            plugin: inert_1.default
        },
        {
            plugin: vision_1.default
        },
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ];
    yield server.register(plugins);
    yield server.start();
    console.log('Server running on %s', server.info.uri);
});
exports.start = start;
(0, exports.start)();
/*server.route({
    method: 'GET',
    path: '/',
    handler: function () {
        return 'Hello World!';
    }
});*/
const voucherRoutes = (server) => {
    //create new voucher
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
        handler: voucherService_1.createVoucher
    });
    //server.route 2
    // server.route 3 
};
exports.voucherRoutes = voucherRoutes;
(0, exports.voucherRoutes)(server);
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
