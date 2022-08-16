import mongoose from 'mongoose';
import { resultsSchema } from '../models/results.js';

const Result = mongoose.model('Result', resultsSchema);

export function createResult(result) {
    return new Promise((resolve, reject) => {
        const toCreate = new Result(result);
        toCreate.save()
            .then(newResult => {
                resolve(newResult);
            })
            .catch(err => reject(err));
    });
}

export function getResults(params) {
    return new Promise((resolve, reject) => {
        Result.find()
            .then((results) => {
                resolve(results);
            })
            .catch((err) => reject(err));
    });
}

