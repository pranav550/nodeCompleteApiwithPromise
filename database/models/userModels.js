const mongoose = require('mongoose');
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    image: String
}, {
    timestamps: true
});

// UserSchema.pre('save', function (next) {
//     var user = this;

//     // only hash the password if it has been modified (or is new)
//     if (!user.isModified('password')) return next();

//     // generate a salt
//     bcrypt.genSalt(saltRounds, function (err, salt) {
//         if (err) return next(err);

//         // hash the password using our new salt
//         bcrypt.hash(user.password, salt, function (err, hash) {
//             if (err) return next(err);

//             // override the cleartext password with the hashed one
//             user.password = hash;
//             console.log(user.password)
//             next();
//         });
//     });
// });

module.exports = mongoose.model('User', UserSchema)
