import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const resultsSchema = new Schema({
    combination: [Number],
    game: String,
    dateDrawn: String,
    jackpot: Number,
    winners: Number,
    // createdOn: String,
}, {
    timestamps: true
});