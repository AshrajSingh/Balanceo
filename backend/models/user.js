import mongoose from "mongoose";

export const User = mongoose.model('Users', {
    username: String,
    email: String,
    password: String
});