import { Typography } from '@mui/material'
import { useAppSelector } from '../hooks'

const HelloUser = () => {
  const user = useAppSelector((state) => state.user)
  const text = user.name || ''

  return (
    <Typography
      noWrap
      component='div'
      variant='h6'
      sx={{ padding: '12px', float: 'left' }}
    >
      {text}
    </Typography>
  )
}

export default HelloUser
