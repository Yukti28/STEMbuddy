import mongoose from "mongoose";    

const chatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    subject: {
        type: String,
        enum: ["Science", "Engineering", "Technology", "Math"],
        required: true
    },
    message: [{
        text: {
            type: String,
            required: true
        },
        sender: {
            type: String,
            enum: ["user", "bot"],
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true });

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;


//this code shows which fields are going to be stored in the chat collection in the database(mongodb)
//this schema is used to store chat messages between the user and the bot
//it stores the user id, subject, message text, sender type and created date