import { Routes, Route } from 'react-router-dom'
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
import { initiateUser } from './reducers/userLoginReducer'
import ShoppingCart from './components/ShoppingCart'
import SignIn from './components/SignIn'

const categories = ['all', 'mouse', 'cat', 'sportswear', 'drinks', 'mushrooms']

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initiateCart())
    dispatch(initiateUser())
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
          <Routes>
            <Route path='/' element={<ProductList />} />
            <Route path='/cart' element={<ShoppingCart />} />
            <Route path='/signin' element={<SignIn />} />
          </Routes>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
      <SideCategoriesTabsDrawer />
    </>
  )
}

export default App

