import express from 'express';
export const router = express.Router();
import { solveKnightsTour } from './../helpers/knightsTour.js';

router.get('/solve/:dimension/:x/:y', async (req, res, next) => {

    const size = req.params.dimension;
    const xcor = req.params.x;
    const ycor = req.params.y;

    const numSize = parseInt(size);
    const numSquared = numSize * numSize;

    let results;

    let tries = 0;
    do {
        try {
            results = solveKnightsTour(size, { x: xcor, y: ycor });
        } catch (err) {
            results = [];
        }
        tries++;
    } while ((results.length !== numSquared) && tries < numSize);

    if (results.length !== numSquared) {
        res.send('No solution');
    } else {
        res.send('Finished');
    }

});