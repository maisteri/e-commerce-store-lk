import { IconButton } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { logoutUser } from '../../reducers/userLoginReducer'

const LoginButton = () => {
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  return user.name ? (
    <IconButton
      size='large'
      edge='end'
      aria-label='account of current user'
      aria-haspopup='true'
      onClick={() => dispatch(logoutUser())}
      color='inherit'
    >
      <LogoutIcon />
    </IconButton>
  ) : (
    <IconButton
      size='large'
      edge='end'
      aria-label='account of current user'
      aria-haspopup='true'
      onClick={() => navigate('/signin')}
      color='inherit'
    >
      <LoginIcon />
    </IconButton>
  )
}

export default LoginButton
