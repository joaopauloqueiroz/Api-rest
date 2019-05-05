//acessa a database
const mongoose = require("../../database");
mongoose.Promise = require("bluebird");

//immportar a biblioteca para criptografar a senha
const bcrypt = require("bcryptjs");

//schema e os campos que vamos ter no banco de dados dentro da tabela abaixo
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    require: true,
    select: false //quando der select essa informação não será mostrada no select do usuario
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpired: {
    type: Date,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

//antes de salvar o usuario eu gero o hash para a senha
//mongoose .pre() e uma função para fazer algo antes de salvar no banco
UserSchema.pre("save", async function(next) {
  //10 e o numero de vezes que o hash seja gerado (numero de rounds)
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

//define o model, com o nome do model e o schema a (tabela)
const User = mongoose.model("User", UserSchema);

//exportar o model para usar em outra classe
module.exports = User;
