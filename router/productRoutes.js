const express = require("express");
const router = express.Router()
const productController = require("../controller/productController");
const middleware = require("../middleware/middleware")

function createProduct(req, res) {
    productController.createProduct(req)
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

function getProduct(req, res) {
    productController.getProduct(req)
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

function getProductById(req, res) {
    productController.getProductById(req)
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

function getDeleteById(req, res) {
    productController.getDeleteById(req)
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

function getUpdateById(req, res) {
    productController.getUpdateById(req)
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

function getFilter(req, res) {

    productController.getFilter(req)
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

function getPagination(req, res) {
    console.log("yy")

    productController.getPagination(req)
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
router.post('/', createProduct);
router.get('/allProduct', getProduct);

router.get('/:id', middleware.Middleware, getProductById);
router.delete('/:id', getDeleteById);
router.put('/:id', getUpdateById);
router.get('/allProduct/:search', getFilter);
router.get('/allProduct/:page/:limit', getPagination);


module.exports = router