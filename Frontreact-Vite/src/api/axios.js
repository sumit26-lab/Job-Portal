import axios from 'axios';
let baseURL='http://localhost:4000'
export default axios.create({
    baseURL: baseURL
});
export const axiosPrivate  =axios.create({
    baseURL: baseURL,
    headers:{'Content-Type':'appliaction/json'},
    withCredentials:true

});