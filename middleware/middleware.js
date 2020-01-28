const jwt = require("jsonwebtoken");

function Middleware(req, res, next) {

    try {
        let token = req.headers.authorization;
        jwt.verify(token, process.env.auth_key, function (err, decoded) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'Token is not valid'
                });
            }
            else {
                req.decoded = decoded,
                    next();
            }
        })
    } catch (error) {
        return res.status(400).json({
            msg: "Auth failed"
        });
    }
}


module.exports = {
    Middleware: Middleware
}