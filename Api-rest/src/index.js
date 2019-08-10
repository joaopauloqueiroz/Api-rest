const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const db = require('./app/models');
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
require("./controller/index")(app)

db.sequelize.sync({force: true}).then(() => {
  app.listen(3001, () => {
    console.log("server is running on port 3001 ...")
  })
}).catch((err) => {
  
});
