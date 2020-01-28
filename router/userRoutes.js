const express = require("express");
const router = express.Router()
const userController = require("../controller/userController");
const path = require('path');
const multer = require('multer');
// const middleware = require("../middleware/middleware")

// const PATH = './public/';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
        }
    }
});
function createUserr(req, res) {
    // console.log(req.body)
    userController.createUser(req)
        .then(data => {
            console.log(data, "mydata")
            res.status(200).json({
                code: 200,
                result: data
            })
        })
        .catch(err => {
            res.status(500).json({
                code: 500,
                error: err,
                msg: "ffffffffff"
            })
        })
}


function loginUserr(req, res) {
    // console.log(req.body)
    userController.loginUser(req)
        .then(data => {
            res.status(200).json({
                code: 200,
                result: data
            })
        })
        .catch(err => {
            res.status(500).json({
                code: 500,
                error: err
            })
        })
}





// predicate the router with a check and bail out when needed
router.post('/reg', upload.single('image'), createUserr);
router.post('/login', loginUserr);



module.exports = router