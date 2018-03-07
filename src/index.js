const express = require('express');
const bodyParser = require('body-parser');

//cria a aplicação
const app = express();

//para que a api entenda que vamos trabalhar com json
app.use(bodyParser.json());
//para decodar os parametros da url
app.use(bodyParser.urlencoded({ extended: false }));

//criar uma rota req=requisicao token tudo, res e para enviar a resposta para o usuario
/*app.get('/', (req, res)=>{
	res.send('ok');
});*/

//repassando o app por que vou precisar reutilizalo, a mesma classe em outras classes
require('./controller/authControler')(app);


app.listen(3000);