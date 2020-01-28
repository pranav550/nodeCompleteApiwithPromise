const User = require("../database/models/userModels");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
class UserController {
    constructor() {

    }
    createUser(req) {
        return new Promise((resolve, reject) => {
            console.log("zzzzzzzz", req.body.email, "check");
            bcrypt.hash(req.body.password, 10).then((hash) => {

                var user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                    image: req.file.path
                });
                console.log(user, "dddddd")
                user.save()
                    .then(data => {
                        console.log(data)
                        resolve(data)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    });
            })
        })
    }

    loginUser(req) {
        return new Promise((resolve, reject) => {
            if (!req.body.email) {
                reject({
                    code: 400,
                    msg: "Email is Required"
                })
            } else {
                if (!req.body.password) {
                    reject({
                        code: 400,
                        msg: "Password is Required"
                    })
                }
                else {
                    User.findOne({ "email": req.body.email })
                        .then((x) => {
                            if (x) {
                                console.log(x, "dara")
                                bcrypt.compare(req.body.password, x.password)
                                    .then((match) => {
                                        console.log(match, "dara1")
                                        if (match) {
                                            let payload = { subject: x.email, id: x.id }
                                            var token = jwt.sign({
                                                payload
                                            },
                                                process.env.auth_key,
                                                {
                                                    expiresIn: "1h"
                                                }

                                            );
                                            resolve({
                                                code: 200,
                                                msg: "user Sucessfully login",
                                                token: token
                                            })
                                        } else {
                                            reject({
                                                code: 500,
                                                msg: "Password is not match"
                                            })
                                        }
                                    })
                                    .catch(err => {
                                        reject({
                                            err: err,
                                            msg: "Password is not found"
                                        })
                                    })
                            }
                            else {
                                reject({
                                    code: 400,
                                    msg: "Email is not match"
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            reject({
                                err: err,
                                msg: "Authentication"
                            })
                        })
                }

            }


        })

    }






}

module.exports = new UserController();
