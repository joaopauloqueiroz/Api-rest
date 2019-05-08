//immportar a biblioteca para criptografar a senha
const bcrypt = require("bcryptjs");
//executar a query
const {create, findOne, findByIdAndUpdate} = require('./FunctionsUsers.js')
//exportar o model para usar em outra classe

module.exports = {
      create: async (data) => {
        data.password = await bcrypt.hash(data.password, 10)
      return await create(data)
  },

  findOne: async (param) => {
    return await findOne(param)
  },

  findByIdAndUpdate: async (param, data) => {
    return await findByIdAndUpdate(param, data)
  }
}

