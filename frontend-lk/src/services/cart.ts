import axios from './index'
import { ProductId, ShoppingCartItem, ShoppingCartItemId } from '../types'

import { apiBaseUrl } from '../config'
const resource = 'cart'

const listItems = async () => {
  const { data } = await axios.get<ShoppingCartItem[]>(
    `${apiBaseUrl}/${resource}`
  )
  return data
}

const addItem = async (id: ProductId) => {
  const { data } = await axios.post<ShoppingCartItem>(
    `${apiBaseUrl}/${resource}`,
    {
      id,
    }
  )
  return data
}

const modifyItemQuantity = async (id: ShoppingCartItemId, quantity: number) => {
  const { data } = await axios.put<ShoppingCartItem>(
    `${apiBaseUrl}/${resource}/${id}`,
    {
      quantity,
    }
  )
  return data
}

const deleteItem = async (id: ShoppingCartItemId) => {
  await axios.delete(`${apiBaseUrl}/${resource}/${id}`)
}

export default {
  listItems,
  addItem,
  modifyItemQuantity,
  deleteItem,
}
