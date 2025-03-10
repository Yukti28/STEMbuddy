import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

class Database {
    constructor() {
        this._connect();
    } //folllow singleton pattern

    async _connect() {
        try {
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log("Database connected to:", mongoose.connection.host);
        } catch (error) {
            console.error("Connection failure", error);
            process.exit(1);
        }
    }
}

const instance = new Database();
Object.freeze(instance);

export default instance;

//this file is used to connect to the database
//it uses the mongoose library to connect to the database