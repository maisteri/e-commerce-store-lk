import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { InitialGeneralState, Product } from '../types'
import { AppThunk } from '../store'
import productService from '../services/product'

const initialState: InitialGeneralState = {
  sideDrawerOpen: false,
  categories: [],
  searchFilter: '',
  categorySelected: '',
  products: [],
}

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setSideDrawerOpen(state, action: PayloadAction<boolean>) {
      state.sideDrawerOpen = action.payload
    },
    setCategories(state, action: PayloadAction<Array<string>>) {
      state.categories = action.payload
    },
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.categorySelected = action.payload
    },
    setSearchFilter(state, action: PayloadAction<string>) {
      state.searchFilter = action.payload
    },
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload
    },
  },
})

export const initiateCategories = (): AppThunk => {
  return async (dispatch) => {
    const categories = await productService.getAllCategories()
    dispatch(setCategories(categories))
  }
}

export const initiateProducts = (): AppThunk => {
  return async (dispatch) => {
    const products = await productService.getAll({ category: '', search: '' })
    dispatch(setProducts(products))
  }
}

export const getProductsByCategory = (category: string): AppThunk => {
  return async (dispatch) => {
    const products = await productService.getAll({ category, search: '' })
    dispatch(setProducts(products))
  }
}

export const getProductsByFilter = (search: string): AppThunk => {
  return async (dispatch) => {
    const products = await productService.getAll({ category: '', search })
    dispatch(setProducts(products))
  }
}

export const {
  setSideDrawerOpen,
  setCategories,
  setSelectedCategory,
  setSearchFilter,
  setProducts,
} = generalSlice.actions

export default generalSlice.reducer
