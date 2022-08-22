import mongoose from 'mongoose';
import { userSchema } from '../models/users.js';

const User = mongoose.model('User', userSchema);


export function getUserByUsername(name) {
    const pattern = new RegExp(`${name}`);
    return new Promise((resolve, reject) => {
        User.findOne({ username: { $regex: pattern, $options: 'i' } })
            .then((result) => {
                resolve(result);
            })
            .catch((err) => reject(err));
    });
}

export function createUser(user) {
    return new Promise((resolve, reject) => {
        const toCreate = new User(user);
        toCreate.save()
            .then(newUser => {
                resolve(newUser);
            })
            .catch(err => reject(err));
    });
}

export function updateUser(user, params) {
    return new Promise((resolve, reject) => {
        try {
            User.findByIdAndUpdate(user._id, params)
                .then((result) => resolve(result))
                .catch((err) => reject(err));
        } catch (err) {
            reject(err);
        }

    });
}

export function isValidLogin(user, creds) {
    return creds.password === user.password;
}

// export function signInUser(user) {
//     return new Promise((resolve, reject) => {
//         await delay(1600);
//         try {
//             await this.updateUser(user, { isSignedIn: true });
//         } catch (err) {
//             reject(err);
//         }
//     });



// }