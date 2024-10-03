import { Box, Toolbar, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import SearchBar from './SearchBar'
import LoginButton from './Buttons/LoginButton'
import Logo from './Logo'
import ShoppingCartButton from './Buttons/ShoppingCartButton'
import MenuButton from './Buttons/MenuButton'
import { Link } from 'react-router-dom'
import HelloUser from './HelloUser'
import { env } from '../config'

export default function PrimaryAppBar() {
  return (
    <Box sx={{ flexGrow: 1, position: 'fixed', zIndex: 10 }}>
      <AppBar>
        <Toolbar>
          <MenuButton />
          <Typography
            variant='h6'
            component='div'
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link to={'/'}>
              <Logo
                path={
                  env === 'development' ? 'src/data/lk_logo.jpg' : 'lk_logo.jpg'
                }
              />
            </Link>
          </Typography>
          <SearchBar />

          <ShoppingCartButton />

          <LoginButton />
          <HelloUser />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
