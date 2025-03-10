import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    questioncounter: {
        Science: {type: Number,default: 0},
        Engineering: {type: Number,default: 0},
        Technology: {type: Number,default: 0},
        Math: {type: Number,default: 0},
    }
},{timestamps: true}
); 

const User = mongoose.model("User", userSchema);
export default User;

//this code shows which fields are going to be stored in the user collection in the database(mongodb)
//this schema is used to store user information like name, email, password and questioncounter
