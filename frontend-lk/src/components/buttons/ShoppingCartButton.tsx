import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

interface ShoppingCartButtonProps {
  badgeContent: number
}

const ShoppingCartButton = (props: ShoppingCartButtonProps) => {
  return (
    <IconButton
      size='large'
      aria-label={`${props.badgeContent} items in shopping cart`}
      color='inherit'
      onClick={() => console.log('shopping...')}
    >
      <Badge badgeContent={props.badgeContent} color='error'>
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  )
}

export default ShoppingCartButton
