import { Box, Toolbar, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import BasicSearchBar from './SearchBar'
import BasicLoginButton from './buttons/LoginButton'
import BasicLogo from './Logo'
import ShoppingCartButton from './buttons/ShoppingCartButton'
import MenuButton from './buttons/MenuButton'
import { Link } from 'react-router-dom'
import HelloUser from './HelloUser'

export default function PrimaryAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <MenuButton />
          <Typography
            variant='h6'
            component='div'
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link to={'/'}>
              <BasicLogo path='/src/data/lk_logo.jpg' />
            </Link>
          </Typography>
          <BasicSearchBar />

          <ShoppingCartButton />

          <BasicLoginButton />
          <HelloUser />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
