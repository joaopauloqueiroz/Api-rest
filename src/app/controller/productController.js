const express = require("express")
const router = express.Router()

const middleware = require("../middlewares/auth")
const permission = require("../middlewares/permission")
const Product = require("../model/Products/");

router.use(middleware)

router.get("/create", permission, async (req, res, next) => {
	const { name } = req.body;

	if(await Product.findOne(name))
		return res.status(400).send({ error: "Produto já cadastrado" });

	let Products = await Product.create(req.body)
  res.send(Products)
})

router.get("/all", async (req, res, next) => {
	let Products = await Product.findAll()
	res.send(Products)
})

router.put("/update", async (req, res, next) => {
	const {id} = req.body

	if(isNaN(id) || id === '')
		return res.status(400).send({ error: "Id is not defined" })

	let Products = await Product.updateProd(id, req.body)

	res.send(Products)
})


router.delete("/delete", async (req, res, next) => {
	const {id} = req.body;
	if(isNaN(id) || id === '')
		return res.status(400).send({ error: "Id is not defined" })
	let Products = await Product.deleteProd(id)
	res.send({seccess: Products})
})

module.exports = app => app.use("/products", router)
