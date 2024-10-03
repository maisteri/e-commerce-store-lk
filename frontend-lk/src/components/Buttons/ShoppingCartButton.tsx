import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useAppSelector } from '../../hooks'
import { useNavigate } from 'react-router-dom'

const ShoppingCartButton = () => {
  const numberOfItemsInCart = useAppSelector(
    (state) => state.shoppingCart
  ).length
  const navigate = useNavigate()

  return (
    <IconButton
      size='large'
      aria-label={`${numberOfItemsInCart} items in shopping cart`}
      color='inherit'
      onClick={() => navigate('/cart')}
    >
      <Badge badgeContent={numberOfItemsInCart} color='error'>
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  )
}

export default ShoppingCartButton
