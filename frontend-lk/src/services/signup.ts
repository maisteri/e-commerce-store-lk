import { NewUser, UserData } from '../types'
import axios from './index'
import { apiBaseUrl } from '../config'
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
