import mongoose from "mongoose";
// const ObjectId = Schema.ObjectId;

const Schema = mongoose.Schema;

export const userSchema = new Schema({
    username: String,
    password: String,
    isSignedIn: Boolean,
    // createdOn: String,
}, {
    timestamps: true
});