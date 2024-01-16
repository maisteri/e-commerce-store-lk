// import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
// import productService from '../services/product'
// import { Product } from '../types'
import { useAppSelector } from '../hooks'
// import { useDebounce } from 'use-debounce'

const ProductList = () => {
  const products = useAppSelector((state) => state.general.products)
  // const searchFilter = useAppSelector((state) => state.general.searchFilter)
  // const [debouncedSearchFilter] = useDebounce(searchFilter, 1000)

  // useEffect(() => {
  //   const fetchProductList = async () => {
  //     const products = await productService.getAll({
  //       category,
  //       search: debouncedSearchFilter,
  //     })
  //     setProducts(products)
  //   }
  //   void fetchProductList()
  // }, [category, debouncedSearchFilter])

  return (
    <>
      {products.map((p) => (
        <ProductCard key={p.title} {...p} />
      ))}
    </>
  )
}

export default ProductList
