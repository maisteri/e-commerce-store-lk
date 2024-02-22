import ProductCard from './ProductCard'
import { sortFunctions } from '../utils'
import { useAppSelector } from '../hooks'

const ProductList = () => {
  const products = useAppSelector((state) => state.general.products)
  const sortableProducts = [...products]
  const sortOrder = useAppSelector((state) => state.general.sortOrder)

  if (sortOrder) {
    sortableProducts.sort(sortFunctions[sortOrder])
  }

  return (
    <>
      {sortableProducts.map((p) => (
        <ProductCard key={p.title} {...p} />
      ))}
    </>
  )
}

export default ProductList
