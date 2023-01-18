import mongoose from "mongoose";

const messagesCollection = 'messages'

const MessageSchema = mongoose.Schema({
    Email: String,
    Name: String,
    LastName: String,
    Age: Number,
    User: String,
    Avatar: String,
    message: String,
    timestamp: Number
});

export const Message = mongoose.model(messagesCollection, MessageSchema)