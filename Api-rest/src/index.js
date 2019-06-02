const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const expressValidator = require('express-validator')
//cria a aplicação
const app = express()

app.use(expressValidator())

app.use(cors())
//para decodar os parametros da url
app.use(bodyParser.urlencoded({ extended: false }))
//para que a api entenda que vamos trabalhar com json
app.use(bodyParser.json())
//repassando o app por que vou precisar reutilizalo, a mesma classe em outras classes
require("./app/controller/index")(app)

app.listen(3001, () => {
  console.log("server is running on port 3001 ...")
})