const express = require("express");
const bodyParser = require("body-parser");

//cria a aplicação
const app = express();

//para que a api entenda que vamos trabalhar com json
app.use(bodyParser.json());
//para decodar os parametros da url
app.use(bodyParser.urlencoded({ extended: false }));

//repassando o app por que vou precisar reutilizalo, a mesma classe em outras classes
require("./app/controller/index")(app);

app.listen(3000, () => {
  console.log("server is running on port 3000 ...");
});
