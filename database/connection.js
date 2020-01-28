const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database Connected")
    } catch (error) {
        console.log("Database Connrection error", error)
        throw new Error(error);
    }

}


