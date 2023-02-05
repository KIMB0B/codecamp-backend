import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    token: String,
    phone: String,
    isAuth: Boolean,
});

export const TokenCollection = mongoose.model("Tokens", TokenSchema);
