import express from 'express';
export const router = express.Router();
import { getUserByUsername, createUser, isValidLogin, updateUser } from '../repositories/users.js';

const delay = ms => new Promise(res => setTimeout(res, ms));

router.post('/login', async (req, res, next) => {
    await delay(1600);
    const user = await getUserByUsername(req.body.username);

    if (user) {
        const validCreds = isValidLogin(user, req.body);
        if (validCreds) {
            await updateUser(user, { isSignedIn: true });
            res.send('Logged in');
        } else {
            res.send('Invalid Username or Password');
        }
    } else {
        res.send('Invalid Username or Password')
    }
});

router.post('/logout', async (req, res, next) => {
    await delay(1600);
    const user = await getUserByUsername(req.body.username);

    if (user) {
        await updateUser(user, { isSignedIn: false });
        res.send('Logged out');
    } else {
        res.send('Bad Request')
    }
});

router.post('/changePassword', async (req, res, next) => {
    await delay(1600);
    const user = await getUserByUsername(req.body.username);

    if (!req.body.password) {
        res.send('Password required');
    } else if (req.body.password && req.body.password.length < 5) {
        res.send('Password too short');
    }
    if (user) {
        await updateUser(user, { password: req.body.password });
        res.send('Password changed');
    } else {
        res.send('Bad Request')
    }
});

router.post('/signup', async (req, res, next) => {
    const existing = await getUserByUsername(req.body.username);
    if (!req.body.password || req.body.password.length < 5) {
        const err = new Error('Password too short');
        next(err);
    }

    if (existing && existing.length > 0) {
        const err = new Error('Username already taken');
        next(err);
    } else {
        res.send(await createUser(req.body));
    }

});