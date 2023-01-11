import mongoose from "mongoose";

const messagesCollection = 'messages'

const MessageSchema = mongoose.Schema({
    user: String,
    message: String,
    timestamp: Number
});

export const Message = mongoose.model(messagesCollection, MessageSchema)