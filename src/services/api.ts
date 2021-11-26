import axios, { AxiosInstance } from 'axios'

const baseURL = 'http://localhost:3333'
const token = localStorage.getItem('token')
const headers: { Authorization: string } = {
  Authorization: ''
}

if (token) {
  headers.Authorization = `Bearer ${token}`
}

export const authenticatedRequest: () => AxiosInstance | null = () => {
  const token = localStorage.getItem('token')
  const headers: { Authorization: string } = {
    Authorization: ''
  }
  if (!token) return null

  headers.Authorization = `Bearer ${token}`
  return axios.create({ baseURL, headers })
}

const api = axios.create({
  baseURL,
  headers
})

export { api }
