import axios from './index'
import { CategorySelected, Product, SearchFilter } from '../types'

const apiBaseUrl = import.meta.env.VITE_API_URL

interface Params {
  category: CategorySelected
  search: SearchFilter
}

const getAll = async (params: Params) => {
  const { data } = await axios.get<Product[]>(`${apiBaseUrl}/products`, {
    withCredentials: true,
    params,
  })
  return data
}

const getAllCategories = async () => {
  const { data } = await axios.get<string[]>(
    `${apiBaseUrl}/products/categories`,
    {
      withCredentials: true,
    }
  )
  return data
}

export default {
  getAll,
  getAllCategories,
}
