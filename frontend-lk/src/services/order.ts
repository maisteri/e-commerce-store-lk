import { OrderId, Order } from '../types'
import axios from './index'
import { apiBaseUrl } from '../config'
const resource = 'order'

const makeOrder = async (order: Order) => {
  const response = await axios.post<OrderId>(`${apiBaseUrl}/${resource}`, order)
  return response.data
}

const exportables = {
  makeOrder,
}

export default exportables
