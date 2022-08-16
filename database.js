import mongoose from 'mongoose';

async function init() {
    try {
        const connectionString = 'mongodb://localhost:27017/testdb';
        await mongoose.connect(connectionString);
        console.log(`Connected successfully to :${connectionString}`);

    } catch (e) {
        throw new Error(e);
    }
}

export { init };
