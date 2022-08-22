import express, { json } from 'express';
import { init as initializeDb } from './database.js';
import { router as authRouter } from './routes/auth.js';
import { router as resultsRouter } from './routes/results.js';
import { router as tourRouter } from './routes/tour.js';
import cors from 'cors';
const app = express();
const port = 3333;

initializeDb();

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/results', resultsRouter);
app.use('/tour', tourRouter);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

app.use(function (err, req, res, next) {
    const error = new Error();
    error.message = err.message;
    error.status = err.status || 500;
    console.log(`[!] ${error.message || 'generic error'}`)
    res.status(error.status).json(error);
});

