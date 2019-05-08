//import path para trabalhar com os caminhos
const path = require("path");

//modulo de envio de email
const nodemailer = require("nodemailer");
//este e um modulo de template de email, que possui variaveis que podemos alterar para enviar emails html
const hbs = require("nodemailer-express-handlebars");
// isso e uma desestruturação, pedo apenas o que eu quero la de dentro
const { host, port, user, pass } = require("../config/mailer.json");

var transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass }
});
//configuração handlebars
transport.use(
  'compile',
  hbs({
    //padrão
    viewEngine: 'hadlebars',
    //onde vai ficar os templates - pasta resourse
    viewPath: path.resolve('resource/mail/'),
    //nome da extençaõ
    extName: '.html'
  })
);

module.exports = transport;
