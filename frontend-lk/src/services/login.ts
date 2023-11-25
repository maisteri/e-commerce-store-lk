import { Credentials, UserData } from '../types'
import axios from './index'
const apiBaseUrl = import.meta.env.VITE_API_URL
const resource = 'login'

const login = async (credentials: Credentials) => {
  const response = await axios.post<UserData>(
    `${apiBaseUrl}/${resource}`,
    credentials
  )
  return response.data
}

const exportables = {
  login,
}

export default exportables
