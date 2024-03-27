import { Product, SortOrder } from './types'
import * as yup from 'yup'

const sortByPriceAscending = (productA: Product, productB: Product) => {
  if (productA.price === productB.price) {
    return 0
  }
  return productA.price - productB.price
}

export const sortByPriceDescending = (productA: Product, productB: Product) => {
  if (productA.price === productB.price) {
    return 0
  }
  return productB.price - productA.price
}

const sortByRating = (productA: Product, productB: Product) => {
  if (productA.rating === productB.rating) {
    return 0
  }
  return productB.rating - productA.rating
}

export const sortFunctions = {
  'price, ascending': sortByPriceAscending,
  'price, descending': sortByPriceDescending,
  rating: sortByRating,
}

export const sortingOptions = Object.keys(sortFunctions) as SortOrder[]

export const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'First name must be more than 1 letter')
    .max(14, 'First name must be less than 15 letters')
    .required('First name is required'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be more than 1 letter')
    .max(14, 'Last name must be less than 15 letters'),
  streetAddress: yup
    .string()
    .required('Address is required')
    .max(64, 'Address must be less than 64 letters'),
  city: yup.string().required('City is required'),
  zip: yup.string().length(5).required('Zip / Postal code is required'),
  country: yup.string().required('Country is required'),
})
