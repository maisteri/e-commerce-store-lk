import { Routes, Route } from 'react-router-dom'
import CategoriesTabs from './components/CategoriesTabs'
import PrimaryAppBar from './components/PrimaryAppbar'
import { Grid, CssBaseline } from '@mui/material'
import SideCategoriesTabsDrawer from './components/SideCategoriesTabsDrawer'
import ProductList from './components/ProductsList'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'
import { initiateCart } from './reducers/shoppingCartReducer'
import { initiateUser } from './reducers/userLoginReducer'
import ShoppingCart from './components/ShoppingCart'
import SignIn from './components/SignIn'
import {
  initiateCategories,
  initiateProducts,
} from './reducers/siteGeneralReducer'
import SignUp from './components/SignUp'

const App = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector((state) => state.general.categories)

  useEffect(() => {
    dispatch(initiateCart())
    dispatch(initiateUser())
    dispatch(initiateCategories())
    dispatch(initiateProducts())
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
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
      <SideCategoriesTabsDrawer />
    </>
  )
}

export default App

