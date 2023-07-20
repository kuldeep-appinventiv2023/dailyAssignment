import mongoose, { Document, Schema } from 'mongoose';

interface Session extends Document {
    user : object;
    token: String;
    created_at : Date;
    expires_at : Date;
}

// Define the schema for the follow/following collection
const sessionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    expires_at: { type: Date, default: Date.now },
});

// Create the User model using the postSchema
const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
export default mongoose.model<Session>('Session', sessionSchema);