import axios from "axios";

export const API_URL = "http://localhost:7542/2.0"

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

export default api