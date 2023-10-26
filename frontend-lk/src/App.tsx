import CategoriesTabs from './components/CategoriesTabs'
import PrimaryAppBar from './components/PrimaryAppbar'
import { Grid, CssBaseline } from '@mui/material'
import ProductCard from './components/ProductCard'
import ShoppingCart, { ShoppingCartItem } from './components/ShoppingCart'

const categories = ['all', 'mouse', 'cat', 'sportswear', 'drinks', 'mushrooms']

const product = {
  title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  price: 109.95,
  description:
    'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
  imageUrl: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  rating: 3.9,
  numberOfRatings: 100,
}

const mockData: ShoppingCartItem[] = [
  { id: 1, title: 'Item 1', price: 10.99, quantity: 2 },
  { id: 2, title: 'Item 2', price: 5.99, quantity: 1 },
  { id: 3, title: 'Item 3', price: 8.99, quantity: 3 },
  { id: 4, title: 'Item 4', price: 15.99, quantity: 1 },
  { id: 5, title: 'Item 5', price: 12.99, quantity: 4 },
]

function App() {
  return (
    <>
      <CssBaseline enableColorScheme />
      <Grid container>
        <Grid item xs={12}>
          <PrimaryAppBar />
        </Grid>
        <Grid item xs={12}>
          <CategoriesTabs categories={categories} />
        </Grid>
        <ProductCard {...product} />
        <ShoppingCart items={mockData} />
      </Grid>
    </>
  )
}

export default App

