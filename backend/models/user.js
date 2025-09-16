import mongoose from "mongoose";

export const User = mongoose.model('Users', {
    username: {type: String},
    email: {type: String},
    password: {type: String}
});