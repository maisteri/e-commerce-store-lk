import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useAppDispatch } from '../../hooks'
import { setSideDrawerOpen } from '../../reducers/siteGeneralReducer'

const MenuButton = () => {
  const dispatch = useAppDispatch()
  return (
    <IconButton
      size='large'
      edge='start'
      color='inherit'
      aria-label='menu'
      sx={{ display: { xs: 'block', sm: 'none' } }}
      onClick={() => dispatch(setSideDrawerOpen(true))}
    >
      <MenuIcon />
    </IconButton>
  )
}

export default MenuButton
