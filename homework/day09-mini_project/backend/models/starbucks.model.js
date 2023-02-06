import mongoose from "mongoose";

const StarbucksSchema = new mongoose.Schema({
    name: String,
    img: String,
});

export const StarbucksCollection = mongoose.model("Starbucks", StarbucksSchema);
