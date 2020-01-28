const Upload = require("../database/models/uploadModel");
const path = require('path');
const multer = require('multer');
class uploadController {
    constructor() {

    }
    createUpload(req) {
        //  const file = req.file
        var fileData = {
            name: req.file.originalname,
            img: req.file.path
        }
        console.log(fileData)
        // console.log(fileData)
        return new Promise((resolve, reject) => {
            var upload = new Upload({
                image: req.file.path,

            });
            upload.save()
                .then(data => {
                    var mergedObj = { ...fileData, ...data };
                    resolve(mergedObj)
                })
                .catch(err => {
                    reject(err)
                });
        })
    }
}


module.exports = new uploadController();
