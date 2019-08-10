const { Product } = require('../app/models')
const express = require("express")
const router = express.Router()


module.exports = app => app.use("/products", router)