import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import productService from '../services/product'
import { Product } from '../types'
import { useAppDispatch } from '../hooks'
import { setCategories } from '../reducers/siteGeneralReducer'

const ProductList = () => {
  const dispatch = useAppDispatch()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProductList = async () => {
      const products = await productService.getAll()
      const categories = Array.from(new Set(products.map((p) => p.category)))
      dispatch(setCategories(categories))
      setProducts(products)
    }
    void fetchProductList()
  }, [])

  return (
    <>
      {products.map((p) => (
        <ProductCard key={p.title} {...p} />
      ))}
    </>
  )
}

export default ProductList
