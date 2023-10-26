import CategoriesTabs from './components/CategoriesTabs'
import PrimaryAppBar from './components/PrimaryAppbar'
import { Grid, CssBaseline } from '@mui/material'
import ProductCard from './components/ProductCard'

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
      </Grid>
    </>
  )
}

export default App

