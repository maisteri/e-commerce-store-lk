import { AddressWithId, Address } from '../types'
import axios from './index'
import { apiBaseUrl } from '../config'
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
