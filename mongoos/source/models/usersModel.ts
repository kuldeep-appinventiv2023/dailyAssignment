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
  password: string;
  profile: profile;
  created_at: Date;
  updated_at : Date;
}

const profileSchema = new mongoose.Schema({
    name : { type: String },
    bio :{ type: String},
    accout_type : { type: String},
    avator : { type: String}
  
});

// Define the schema for the post collection
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile: { type : profileSchema},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// Create the User model using the postSchema
const User = mongoose.model('User', userSchema);
module.exports = User;
export default mongoose.model<User>('User', userSchema);