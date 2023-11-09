import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import productService from '../services/product'
import { Product } from '../types'

const ProductList = () => {
  const [products, setProdcuts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProductList = async () => {
      const products = await productService.getAll()
      setProdcuts(products)
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
