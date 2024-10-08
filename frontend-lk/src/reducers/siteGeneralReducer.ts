import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
  Address,
  AddressWithId,
  InitialGeneralState,
  NotificationIf,
  Payment,
  Product,
  SortOrder,
} from '../types'
import { AppThunk } from '../store'
import productService from '../services/product'
import addressService from '../services/address'
import {
  DISABLE_ERROR_NOTIFICATION,
  DISABLE_SUCCESS_NOTIFICATION,
} from '../constants'

const initialState: InitialGeneralState = {
  sideDrawerOpen: false,
  categories: [],
  searchFilter: '',
  categorySelected: '',
  products: [],
  notification: {
    message: '',
    severity: 'success',
  },
  sortOrder: '',
  deliveryAddress: null,
  paymentInfo: null,
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
    setNotification(state, action: PayloadAction<NotificationIf>) {
      state.notification = action.payload
    },
    setSortOrder(state, action: PayloadAction<SortOrder>) {
      state.sortOrder = action.payload
    },
    setDeliveryAddress(state, action: PayloadAction<AddressWithId>) {
      state.deliveryAddress = action.payload
    },
    setPaymentInfo(state, action: PayloadAction<Payment>) {
      state.paymentInfo = action.payload
    },
    removeDeliveryAddress(state) {
      state.deliveryAddress = null
    },
  },
})

export const notify = (notification: NotificationIf): AppThunk => {
  return async (dispatch) => {
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(
        setNotification(
          notification.severity === 'success'
            ? DISABLE_SUCCESS_NOTIFICATION
            : DISABLE_ERROR_NOTIFICATION
        )
      )
    }, 4000)
  }
}

export const initiateCategories = (): AppThunk => {
  return async (dispatch) => {
    const categories = await productService.getAllCategories()
    const categoriesWithAll = ['all'].concat(categories)
    dispatch(setCategories(categoriesWithAll))
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
    const products = await productService.getAll({
      category: category === 'all' ? '' : category,
      search: '',
    })
    dispatch(setProducts(products))
  }
}

export const getProductsByFilter = (search: string): AppThunk => {
  return async (dispatch) => {
    const products = await productService.getAll({ category: '', search })
    dispatch(setProducts(products))
  }
}

export const saveDeliveryAddress = (address: Address): AppThunk => {
  return async (dispatch) => {
    const addressWithId = await addressService.addAddress(address)
    dispatch(setDeliveryAddress(addressWithId))
  }
}

export const {
  setSideDrawerOpen,
  setCategories,
  setSelectedCategory,
  setSearchFilter,
  setProducts,
  setNotification,
  setSortOrder,
  setDeliveryAddress,
  removeDeliveryAddress,
  setPaymentInfo,
} = generalSlice.actions

export default generalSlice.reducer
