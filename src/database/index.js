const mongoose = require('mongoose');

//conecta no banco de dados, noderest e o nome do banco 
mongoose.connect('mongodb://localhost/noderest', { useMongoCliente: true });
//definir a classe que vai usar (e padrão);
mongoose.Promisse = global.Promise;
//exportar o modulo para que eu possa usa-lo em outras classes
module.exports = mongoose;