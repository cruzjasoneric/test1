import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const combinationsSchema = new Schema({
    combination: [Number],
    game: String,
    dateDrawn: String,
    jackpot: Number,
    winners: Number,
    owner: String,
    // createdOn: String,
}, {
    timestamps: true
});