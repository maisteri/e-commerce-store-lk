// sort functions

import { Product, SortOrder } from './types'

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
  return productA.rating - productB.rating
}

export const sortFunctions = {
  'price, ascending': sortByPriceAscending,
  'price, descending': sortByPriceDescending,
  rating: sortByRating,
}

export const sortingOptions = Object.keys(sortFunctions) as SortOrder[]
