import axios from 'axios';

const instance = axios.create({
    baseURL: "https://papermaker-c81e4-default-rtdb.firebaseio.com"
})

export default instance;