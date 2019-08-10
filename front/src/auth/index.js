import api from "../api/index.js";
const TOKEN_KEY = 'AUTH_TOKEN_KEY'

const isAuthenticated = () => {
    let token = localStorage.getItem(TOKEN_KEY);
    let retorno = false;
    if (token !== null) {
        retorno = tokenAuth();
        return retorno;
    } else {
        return retorno;
    }
}
const getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}
const setLogin = token => {
    localStorage.setItem(TOKEN_KEY, token)
}

const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
}

const tokenAuth = async () => {
    try {
        let response = await api.post('/users/authorization');
        return response.data.success;
    } catch (error) {
        return false;
    }
}

const setUser = async (values) => {
    delete values.token
    localStorage.setItem('name', values.name)
}

export { isAuthenticated, getToken, setLogin, logout, setUser }