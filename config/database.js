const mongoose = require('mongoose');
require('dotenv').config();

exports.db = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("DB CONNECTION SUCCESSFULL");
        }).catch((err) => {
            console.log("DB CONNECTION ISSUE");
            console.error(err);
            process.exit(1);
        })
}