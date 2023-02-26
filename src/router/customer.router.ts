import {Router} from "express";
const customerRouter = Router();
import multer from "multer";
import {Customer} from "../schema/customer.model";
const upload = multer()
customerRouter.get('/create',(req, res) => {
    res.render('create')
});
customerRouter.post('/create',upload.none(), async (req, res) => {
    try{
        const customerNew = new Customer(req.body);
        const customer = await customerNew.save();
        if(customer) {
            res.redirect('/customer/list')
        } else {
            res.render('err')
        }
    }catch (err){
        console.log(err.message)
    }

})
customerRouter.get('/list',async (req, res) => {
    try{
        let limit:number;
        let offset: number;
        if(!req.query.limit||!req.query.limit){
            limit = 3;
            offset =0 ;
        } else {
            limit = parseInt(req.query.limit as string)
            offset = parseInt(req.query.offset as string)
        }
        //limit(number): Số bản ghi tối đa được lấy
        // skip(number): Lấy bản ghi từ vị trí number (Bỏ qua các bản ghi trước đó).
        const customers = await Customer.find().limit(limit).skip(limit*offset);
        res.render('list',{customer: customers});

    }catch (err){
        console.log(err.message)
    }
})
customerRouter.get('/update',async (req, res) => {
    try{
        let id =req.query.id
        const customers = await Customer.findById(id).findOne();
        res.render('update',{cutomers: customers})


    } catch (err){
        console.log(err)
    }
});
customerRouter.post(`/update`,async (req, res) => {
    try {
        let id = req.query.id;
        let values = req.body
        const customers = await Customer. findById(id).updateOne();
        console.log(customers,222)
        res.redirect('/customer/list')
    }catch (err){
        console.log(err)
    }
})
customerRouter.get('/delete', async (req,res)=>{
    try{
        let id = req.query.id;
        console.log(id);
        const customer = await Customer.findById(id).deleteOne();
        res.redirect('/customer/list')
    } catch (err){
        console.log(err)
    }


})
export default customerRouter