const Product = require("../database/models/productModel");
class ProductController {
    constructor() {

    }
    createProduct(req) {
        return new Promise((resolve, reject) => {
            console.log(req.body);

            var product = new Product(req.body);
            product.save()
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject(err)
                });
        })
    }
    getProduct(req) {
        return new Promise((resolve, reject) => {
            Product.find({})
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
    getProductById(req) {
        console.log(req.params.id)
        return new Promise((resolve, reject) => {
            Product.findById(req.params.id)
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    getDeleteById(req) {
        console.log(req.params.id)
        return new Promise((resolve, reject) => {
            Product.findByIdAndDelete({ _id: req.params.id })
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    getUpdateById(req) {
        console.log(req.params.id)

        return new Promise((resolve, reject) => {
            var update = {
                name: req.body.name,
                brand: req.body.brand,
                price: req.body.price
            };
            Product.findByIdAndUpdate({ _id: req.params.id }, update)
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }


    getFilter(req) {
        console.log(req.params.search)
        return new Promise((resolve, reject) => {
            Product.find({ "name": { $regex: req.params.search, $options: "i" } })
                .then(data => {
                    console.log(data)
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    getPagination(req) {
        return new Promise((resolve, reject) => {
            const page = parseInt(req.params.page);
            console.log(page)
            const limit = parseInt(req.params.limit);
            console.log(limit)
            const startIndex = (page - 1) * limit;
            Product.find({}).limit(limit).skip(startIndex)
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }




}

module.exports = new ProductController();
