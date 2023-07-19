import mongoose, { Document, Schema } from 'mongoose';


interface profile {
    name : String,
    bio : String,
    accout_type : String,
    avator : String
}

interface User extends Document {
  username: String;
  email: String;
  password: String;
  profile: profile;
  created_at: Date;
  updated_at : Date;
}

const profileSchema = new mongoose.Schema({
    name : { type: String, required: true },
    bio :{ type: String, required: true },
    accout_type : { type: String, required: true },
    avator : { type: String, required: true }
  
});

// Define the schema for the post collection
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile: { type : profileSchema, required: true},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// Create the User model using the postSchema
const User = mongoose.model('User', userSchema);
module.exports = User;
export default mongoose.model<User>('User', userSchema);