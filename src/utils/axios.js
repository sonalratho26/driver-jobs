import axios from 'axios'

const customFetch = axios.create({
  baseURL: 'http://localhost:3700',
})

export default customFetch
