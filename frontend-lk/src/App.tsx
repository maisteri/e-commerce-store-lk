import CategoriesTabs from './components/CategoriesTabs'
import PrimaryAppBar from './components/PrimaryAppbar'
import { Grid, CssBaseline } from '@mui/material'
// import ProductCard from './components/ProductCard'
// import ShoppingCart, { ShoppingCartItem } from './components/ShoppingCart'
import SideCategoriesTabsDrawer from './components/SideCategoriesTabsDrawer'
import ProductList from './components/ProductsList'
import { useEffect } from 'react'
import { useAppDispatch } from './hooks'
import { initiateCart } from './reducers/shoppingCartReducer'

const categories = ['all', 'mouse', 'cat', 'sportswear', 'drinks', 'mushrooms']

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initiateCart())
    console.log('wadap')
  }, [dispatch])

  return (
    <>
      <CssBaseline enableColorScheme />
      <Grid container>
        <Grid item xs={12}>
          <PrimaryAppBar />
        </Grid>
        <Grid item xs={12}>
          <CategoriesTabs
            categories={categories}
            orientation='horizontal'
            centered
          />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <ProductList />
        </Grid>
        <Grid item xs={3}></Grid>

        {/* <ShoppingCart items={mockData} /> */}
      </Grid>
      <SideCategoriesTabsDrawer />
    </>
  )
}

export default App

