import mongoose, { Document, Schema } from 'mongoose';

interface status {
    accepted : String,
    rejected : String,
    pending : String
}

interface Follow extends Document {
    sender_id: String;
    reciever_id: String;
    account_type: String;
    status: status;
    created_at: Date;
}

const statusSchema = new mongoose.Schema({
    accepted : { type: String, required: true },
    rejected : { type: String, required: true },
    pending : { type: String, required: true },
});

// Define the schema for the follow/following collection
const followSchema = new mongoose.Schema({
    sender_id: { type: String, required: true },
    reciever_id: { type: String, required: true },
    account_type: { type: String, required: true },
    status: { type : statusSchema, required: true},
    created_at: { type: Date, default: Date.now },
});

// Create the User model using the postSchema
const Follow = mongoose.model('follow', followSchema);
module.exports = Follow;
export default mongoose.model<Follow>('Follow', followSchema);