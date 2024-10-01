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

export const addressSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'First name must be more than 1 letter')
    .max(34, 'First name must be less than 35 letters')
    .required('First name is required'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be more than 1 letter')
    .max(34, 'Last name must be less than 35 letters'),
  streetAddress: yup
    .string()
    .required('Address is required')
    .max(64, 'Address must be less than 65 letters'),
  city: yup.string().required('City is required'),
  zip: yup.string().length(5).required('Zip / Postal code is required'),
  country: yup.string().required('Country is required'),
})

export const creditCardSchema = yup.object().shape({
  nameOnCard: yup
    .string()
    .required('Name is required')
    .matches(/^[a-zA-Z\såäöÅÄÖ]+$/, 'Name can only contain letters and spaces'),
  cardNumber: yup
    .string()
    .required('Card number is required')
    .matches(/^\d{16}$/, 'Card number must be exactly 16 digits'),
  expiryDate: yup
    .string()
    .required('Expiry date is required')
    .matches(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      'Expiry date must be in MM/YY format'
    ),
  cvv: yup
    .string()
    .required('CVV is required')
    .matches(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
})
