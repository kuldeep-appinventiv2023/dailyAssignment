import mongoose, { Document, Schema } from 'mongoose';

interface Action extends Document {
    action: String;
    user : object;
    post: object;
    created_at : Date;
}

// Define the schema for the follow/following collection
const actionSchema = new mongoose.Schema({
    action: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now },
});

// Create the User model using the postSchema
const Action = mongoose.model('Action', actionSchema);
module.exports = Action;
export default mongoose.model<Action>('Action', actionSchema);