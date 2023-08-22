import mongoose from "mongoose";
import { Document } from "mongoose";

interface Address {
    resturantNo: string;
    streetNo: number;
    landmark: string;
    city: string;
    state: string;
    pinCode: number;
}

interface Resturant extends Document {
    menuId : object;
    resturantName : String;
    resturantPhoneNo : String;
    resturantPhoto : Buffer; 
    openingTime : Date;
    closingTime : Date;
    Rating : number;
    resturantAddress: Address;
    created_at: Date,
    updated_at : Date
}

const addressSchema = new mongoose.Schema<Address>({
    resturantNo: { type: String, required: true },
    streetNo: { type: Number, required: true },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: Number, required: true }
});

const resturantSchema = new mongoose.Schema({
    menuId : { type : Object },
    resturantName : { type : String, required: true },
    resturantPhoneNo : { type : String, required: true },
    resturantPhoto : { type : Buffer}, 
    openingTime :{ type: Date, required: true},
    closingTime : { type: Date, required: true},
    Rating : { type: Number},
    addressAddress: { type: addressSchema },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Resturant = mongoose.model('resturant', resturantSchema);
console.log('Resturant model created...');
module.exports = Resturant;
export default mongoose.model<Resturant>('resturant', resturantSchema);
