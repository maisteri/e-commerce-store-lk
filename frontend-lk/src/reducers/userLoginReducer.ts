import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import signinService from '../services/signup'
import { UserData, NewUser, CredentialsWithRemember, NavLink } from '../types'
import { AppThunk } from '../store'
import axios from 'axios'
import { notify } from './siteGeneralReducer'
import { SUCCESSFUL_LOGIN, UNKNOWN_ERROR } from '../constants'

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

export const loginUser = (credentials: CredentialsWithRemember): AppThunk => {
  return async (dispatch) => {
    let user: UserData
    const { username, password } = credentials
    const { navigateToStore } = credentials
    try {
      user = await loginService.login({ username, password })
      if (credentials.remember)
        window.localStorage.setItem('loggedLKAppUser', JSON.stringify(user))
      dispatch(setUser(user))
      dispatch(notify(SUCCESSFUL_LOGIN))
      navigateToStore()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        dispatch(
          notify({ message: err.response?.data.error, severity: 'error' })
        )
      } else {
        dispatch(notify(UNKNOWN_ERROR))
      }
    }
  }
}

export const createNewUserAndLogin = (
  newUserData: NewUser,
  navigateToStore: NavLink
): AppThunk => {
  return async (dispatch) => {
    try {
      const user = await signinService.signup(newUserData)
      dispatch(setUser(user))
      navigateToStore()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        dispatch(
          notify({ message: err.response?.data.error, severity: 'error' })
        )
      } else {
        dispatch(notify(UNKNOWN_ERROR))
      }
    }
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
