/**
 * Api
 */
import api from "api/"

/**
 * 
 * @param {Object} form 
 * Recebe un array e retorna um status
 */
const create = async (form) => {
    try {
        const resp = await api.post('/products/create', form)
        return resp
    } catch (error) {
        console.log(error)
    }
}

/**
 * Retorna um array com os produtos
 */
const list = async () => {
    try {
        const resp = await api.get('/products/list')
        return resp
    } catch (error) {
        console.log(error)
    }
}

export {
    create,
    list
}