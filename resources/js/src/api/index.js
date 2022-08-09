import axios from "axios";


export const api = axios.create({
    baseURL : 'http://categories_crud.test/api',
})
