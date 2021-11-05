import axios from 'axios'

const baseURL = 'http://localhost:3333'
const token = localStorage.getItem('token')
const headers = {
  Authorization: ''
}

if (token) {
  headers.Authorization = token
}

const api = axios.create({
  baseURL,
  headers
})

export { api }
