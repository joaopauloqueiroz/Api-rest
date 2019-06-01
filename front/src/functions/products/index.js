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
        delete form.id;
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
        const resp = await api.get('/products/all')
        return resp
    } catch (error) {
        console.log(error)
    }
}

const update = async (data) => {
    try {
        const response = await api.put('/products/update', data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export {
    create,
    list,
    update
}