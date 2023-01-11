import mongoose from "mongoose";

const messagesCollection = 'messages'

const MessageSchema = mongoose.Schema({
    user: String,
    message: String
});

export const Message = mongoose.model(messagesCollection, MessageSchema)