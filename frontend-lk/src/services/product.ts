import axios from './index'
import {
  CategorySelected,
  Product,
  SearchFilter,
  postRatingParams,
} from '../types'

import { apiBaseUrl } from '../config'

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

  if (params.token) {
    headers = { Authorization: `Bearer ${params.token}` }
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
