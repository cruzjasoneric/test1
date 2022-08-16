import express from 'express';
import mongoose from 'mongoose';

export const router = express.Router();
import { createDummyResults } from '../helpers/helpers.js';

import { create, createMany, find, findOne, updateById, deleteOne, deleteMany } from '../helpers/crud.js';
import { resultsSchema } from '../models/results.js';
const Result = mongoose.model('Result', resultsSchema);

const delay = ms => new Promise(res => setTimeout(res, ms));

// router.post('/create', async (req, res, next) => {
//     await delay(1600);
//     const params = {
//         combination: [1,2,3,4,5,6],
//         game: '42',
//         dateDrawn: new Date().toISOString(),
//         jackpot: 12000000.50,
//         winners: 0
//     };
//     const newResult = await create(params, Result);
//     res.send(newResult);

// });

router.get('/', async (req, res, next) => {
    await delay(1600);
    const results = await find({}, Result);
    res.send(results);
});

router.post('/populate/:items', async (req, res, next) => {
    
    const test = createDummyResults(req.params.items);

    await deleteMany({}, Result);
    await createMany(test, Result);

    res.send('Finished');

});