import { IconButton } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'

const BasicLoginButton = () => {
  return (
    <IconButton
      size='large'
      edge='end'
      aria-label='account of current user'
      aria-haspopup='true'
      onClick={() => console.log('me wants to login')}
      color='inherit'
    >
      <AccountCircle />
    </IconButton>
  )
}

export default BasicLoginButton
