import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-junkie.firebaseio.com/'
})

export default instance