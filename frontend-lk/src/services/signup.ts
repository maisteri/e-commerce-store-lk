import { NewUser, UserData } from '../types'
import axios from './index'
const apiBaseUrl = import.meta.env.VITE_API_URL
const resource = 'users'

const signup = async (newUserData: NewUser) => {
  const response = await axios.post<UserData>(
    `${apiBaseUrl}/${resource}`,
    newUserData
  )
  return response.data
}

const exportables = {
  signup,
}

export default exportables
