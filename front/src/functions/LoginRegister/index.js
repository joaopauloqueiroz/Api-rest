import api from "api/"
/**
 * @js Api
 */

 /**
  * @js Auth
  */
 import {setLogin, setUser} from "auth"

/**
 * Função para fazer login
 * @param object
 */

 const logar = async (form) => {
    try {
        const response = await api.post('/auth/authenticate', form)
        if(response.data.token){
            setLogin(response.data.token)
            await setUser(response.data.user)
         return {success: true, data: response.data}
        }
        
    } catch (error) {
        console.error(error)
        return {success: false, data: error.response.data}
    }
 }

 const auth = async () => {
     try {
         const response = await api.get('/auth/authentic')
         return response.data.success
     } catch (error) {
        //  console.error(error)
     }
 }

 export {logar, auth}