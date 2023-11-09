import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const MenuButton = () => {
  return (
    <IconButton
      size='large'
      edge='start'
      color='inherit'
      aria-label='menu'
      sx={{ display: { xs: 'block', sm: 'none' } }}
      onClick={() => console.log('menu?')}
    >
      <MenuIcon />
    </IconButton>
  )
}

export default MenuButton
