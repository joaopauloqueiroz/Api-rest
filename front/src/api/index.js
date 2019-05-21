import axios from 'axios'
import { getToken } from '../auth';
/**
 * Create base url for requisition api
 */
const api = axios.create({
    baseURL: "http://localhost:3000"
})

/**
 * intecept verbs http to verify token
 */
api.interceptors.request.use(async config => {
    const token = await getToken();
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
        config.headers.Accept = "application/json"
    }
    return config;
})

/**
 * Export api 
 */
export default api