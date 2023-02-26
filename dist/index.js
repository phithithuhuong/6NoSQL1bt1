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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose = __importStar(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const customer_router_1 = __importDefault(require("./src/router/customer.router"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.set('view engine', 'ejs');
app.set('views', './src/views');
const DB_URL = 'mongodb://127.0.0.1:27017/dbTest';
mongoose.connect(DB_URL).then(() => {
    console.log("Connect DB success");
}).catch(err => {
    console.log(err.message);
});
app.use('/customer', customer_router_1.default);
app.listen(5000, () => {
    console.log('http://localhost:5000/create');
});
//# sourceMappingURL=index.js.map