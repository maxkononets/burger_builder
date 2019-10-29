import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-builder-29fe3.firebaseio.com'
})

export default instance