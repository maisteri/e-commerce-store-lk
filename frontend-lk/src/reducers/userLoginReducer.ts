import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { Credentials, UserData } from '../types'
import { AppThunk } from '../store'

const initialState: UserData = { token: '', name: '' }

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(_state, action: PayloadAction<UserData>) {
      return action.payload
    },
  },
})

export const initiateUser = (): AppThunk => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedLKAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }
}

export const loginUser = (credentials: Credentials): AppThunk => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedLKAppUser', JSON.stringify(user))
    dispatch(setUser(user))
  }
}

export const logoutUser = (): AppThunk => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedLKAppUser')
    dispatch(setUser(initialState))
  }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer
