const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log(`Mongoose connect to ${conn.connection.host} `);

    } catch (err) {
        console.log(`Error : ${err.message}`);
        process.exit(1)
    }
}

module.exports = connectDB