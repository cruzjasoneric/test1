import mongoose from 'mongoose';

async function init() {
    try {
        const connectionString = 'mongodb://127.0.0.1:27017/testdb';
        await mongoose.connect(connectionString);
        console.log(`Connected successfully to :${connectionString}`);

    } catch (e) {
        throw new Error(e);
    }
}

export { init };
