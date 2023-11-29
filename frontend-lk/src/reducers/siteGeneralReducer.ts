import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  sideDrawerOpen: false,
}

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setSideDrawerOpen(state, action: PayloadAction<boolean>) {
      return { ...state, sideDrawerOpen: action.payload }
    },
  },
})

export const { setSideDrawerOpen } = generalSlice.actions

export default generalSlice.reducer
