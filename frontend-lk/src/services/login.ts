import { Credentials, UserData } from '../types'
import axios from './index'
import { apiBaseUrl } from '../config'
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
