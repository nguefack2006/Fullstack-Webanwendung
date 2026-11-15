import mongoose from "mongoose";

export async function connectMongoDB() {
    await mongoose.connect(
        process.env.MONGO_URL ||
        "mongodb://mongodb:27017/lager_events"
    );

    console.log("MongoDB verbunden");
}