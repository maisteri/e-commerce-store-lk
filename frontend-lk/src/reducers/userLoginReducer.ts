import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import signinService from '../services/signup'
import { Credentials, UserData, NewUser } from '../types'
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

export const loginUser = (credentials: Credentials): AppThunk => {
  return async (dispatch) => {
    let user: UserData
    try {
      user = await loginService.login(credentials)
      window.localStorage.setItem('loggedLKAppUser', JSON.stringify(user))
      dispatch(setUser(user))
      dispatch(notify(SUCCESSFUL_LOGIN))
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

export const createNewUserAndLogin = (newUserData: NewUser): AppThunk => {
  return async (dispatch) => {
    const user = await signinService.signup(newUserData)
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
