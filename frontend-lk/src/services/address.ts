import { AddressWithId, Address } from '../types'
import axios from './index'
const apiBaseUrl = import.meta.env.VITE_API_URL
const resource = 'address'

const addAddress = async (address: Address) => {
  const response = await axios.post<AddressWithId>(
    `${apiBaseUrl}/${resource}`,
    address
  )
  return response.data
}

const exportables = {
  addAddress,
}

export default exportables
