"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customerRouter = (0, express_1.Router)();
const multer_1 = __importDefault(require("multer"));
const customer_model_1 = require("../schema/customer.model");
const upload = (0, multer_1.default)();
customerRouter.get('/create', (req, res) => {
    res.render('create');
});
customerRouter.post('/create', upload.none(), async (req, res) => {
    try {
        const customerNew = new customer_model_1.Customer(req.body);
        const customer = await customerNew.save();
        if (customer) {
            res.redirect('/customer/list');
        }
        else {
            res.render('err');
        }
    }
    catch (err) {
        console.log(err.message);
    }
});
customerRouter.get('/list', async (req, res) => {
    try {
        let limit;
        let offset;
        if (!req.query.limit || !req.query.limit) {
            limit = 3;
            offset = 0;
        }
        else {
            limit = parseInt(req.query.limit);
            offset = parseInt(req.query.offset);
        }
        const customers = await customer_model_1.Customer.find().limit(limit).skip(limit * offset);
        res.render('list', { customer: customers });
    }
    catch (err) {
        console.log(err.message);
    }
});
customerRouter.get('/update', async (req, res) => {
    try {
        let id = req.query.id;
        const customers = await customer_model_1.Customer.findById(id).findOne();
        res.render('update', { cutomers: customers });
    }
    catch (err) {
        console.log(err);
    }
});
customerRouter.post(`/update`, async (req, res) => {
    try {
        let id = req.query.id;
        let values = req.body;
        const customers = await customer_model_1.Customer.updateOne({ id }, { values });
        console.log(customers, 222);
        res.redirect('/customer/list');
    }
    catch (err) {
        console.log(err);
    }
});
customerRouter.get('/delete', async (req, res) => {
    try {
        let id = req.query.id;
        console.log(id);
        const customer = await customer_model_1.Customer.findById(id).deleteOne();
        res.redirect('/customer/list');
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = customerRouter;
//# sourceMappingURL=customer.router.js.map