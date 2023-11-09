import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ShoppingCartItemId, ShoppingCartItem, ProductId } from '../types'
import { AppThunk } from '../store'
import cartService from '../services/cart'

const initialState: ShoppingCartItem[] = []

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    append(state, action: PayloadAction<ShoppingCartItem>) {
      state.push(action.payload)
      console.log('appended')
      return state
    },
    setCart(_state, action: PayloadAction<ShoppingCartItem[]>) {
      console.log('set')
      return action.payload
    },
    remove(state, action: PayloadAction<ShoppingCartItemId>) {
      console.log('removed')
      return state.filter((item) => item.id !== action.payload)
    },
  },
})

export const addItemToCart = (productId: ProductId): AppThunk => {
  return async (dispatch, getState) => {
    const { shoppingCart } = getState()
    const cartItem = await cartService.addItem(productId)
    const itemAlreadyInCart = shoppingCart.find(
      (item) => item.productId === productId
    )
    if (itemAlreadyInCart) {
      const updatedShoppingCart = shoppingCart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      return dispatch(setCart(updatedShoppingCart))
    }
    dispatch(append(cartItem))
  }
}

export const initiateCart = (): AppThunk => {
  return async (dispatch) => {
    const products = await cartService.listItems()
    dispatch(setCart(products))
  }
}

export const modifyItemQuantity = (
  id: ShoppingCartItemId,
  quantity: number
): AppThunk => {
  return async (dispatch, getState) => {
    const { shoppingCart } = getState()
    const modifiedItem = await cartService.modifyItemQuantity(id, quantity)
    const updatedShoppingCart = shoppingCart.map((item) =>
      item.id === id ? modifiedItem : item
    )
    dispatch(setCart(updatedShoppingCart))
  }
}

export const deleteItem = (id: ShoppingCartItemId): AppThunk => {
  return async (dispatch) => {
    await cartService.deleteItem(id)
    dispatch(remove(id))
  }
}

export const { append, remove, setCart } = cartSlice.actions

export default cartSlice.reducer

