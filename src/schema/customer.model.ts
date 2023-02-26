import {Schema, model} from "mongoose"

interface ICustomer {
    name: string;

    code: number;

    email: string;

    phone: string
};
const customerSchema = new Schema<ICustomer>({
    name: String,

    code: Number,

    email: String,

    phone: String
});

const Customer = model<ICustomer>('Customer', customerSchema);

export {Customer};