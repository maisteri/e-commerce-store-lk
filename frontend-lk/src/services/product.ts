import axios from './index'
import { Product } from '../types'

const apiBaseUrl = import.meta.env.VITE_API_URL

const getAll = async () => {
  const { data } = await axios.get<Product[]>(`${apiBaseUrl}/products`, {
    withCredentials: true,
  })
  console.log(data)
  return data
}

export default {
  getAll,
}
