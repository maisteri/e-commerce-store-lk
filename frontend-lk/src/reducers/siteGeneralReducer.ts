import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface initialGeneralState {
  sideDrawerOpen: boolean
  categories: string[]
}

const initialState: initialGeneralState = {
  sideDrawerOpen: false,
  categories: [],
}

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setSideDrawerOpen(state, action: PayloadAction<boolean>) {
      return { ...state, sideDrawerOpen: action.payload }
    },
    setCategories(state, action: PayloadAction<Array<string>>) {
      return { ...state, categories: action.payload }
    },
  },
})

export const { setSideDrawerOpen, setCategories } = generalSlice.actions

export default generalSlice.reducer
