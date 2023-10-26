import { Box, Toolbar, IconButton, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import BasicSearchBar from './BasicSearchBar'
import BasicLoginButton from './BasicLoginButton'
import BasicLogo from './BasicLogo'
import ShoppingCartButton from './ShoppingCartButton'

export default function PrimaryAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <BasicLogo path='/src/data/logo1.png' />
          </Typography>
          <BasicSearchBar />
          <ShoppingCartButton
            badgeContent={4}
            handleClick={() => console.log('wadap')}
          />
          <BasicLoginButton />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
