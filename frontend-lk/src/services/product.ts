import axios from './index'
import {
  CategorySelected,
  Product,
  SearchFilter,
  postRatingParams,
} from '../types'

const apiBaseUrl = import.meta.env.VITE_API_URL

interface Params {
  category: CategorySelected
  search: SearchFilter
}

const getAll = async (params: Params) => {
  const { data } = await axios.get<Product[]>(`${apiBaseUrl}/products`, {
    params,
  })
  return data
}

const getAllCategories = async () => {
  const { data } = await axios.get<string[]>(
    `${apiBaseUrl}/products/categories`
  )
  return data
}

const postRating = async (params: postRatingParams) => {
  let headers = {}
  const loggedUserJSON = window.localStorage.getItem('loggedLKAppUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    headers = { Authorization: `Bearer ${user.token}` }
  }

  await axios.post<void>(
    `${apiBaseUrl}/products/${params.productId}/rating`,
    {
      value: params.rating,
    },
    {
      headers,
    }
  )
}

export default {
  getAll,
  getAllCategories,
  postRating,
}
