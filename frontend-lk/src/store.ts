import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import shoppingCartReducer from './reducers/shoppingCartReducer'
import userLoginReducer from './reducers/userLoginReducer'
import siteGeneralReducer from './reducers/siteGeneralReducer'

export const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer,
    user: userLoginReducer,
    general: siteGeneralReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
