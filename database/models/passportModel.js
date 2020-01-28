const mongoose = require('mongoose');
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
const PassportSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String

}, {
    timestamps: true
});


module.exports = mongoose.model('Passport', PassportSchema)
