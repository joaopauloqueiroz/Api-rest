//executar a query
const {create, findOne, findAll, updateProd, deleteProd} = require('./FunctionsProducts.js')
//exportar o model para usar em outra classe

module.exports = {
      create: async (data) => {
      return await create(data)
  },
  findOne: async (name) => {
    return await findOne(name)
  },
  findAll: async () => {
    return await findAll()
  },

  updateProd: async (id, data) => {
    delete data.id
    return await updateProd(id, data)
  },

  deleteProd: async (id) => {
    return await deleteProd(id)
  }

}

