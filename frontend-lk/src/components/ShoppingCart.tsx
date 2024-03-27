import {
  TableHead,
  Table,
  TableContainer,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  IconButton,
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import BasicButton from './Buttons/BasicButton'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'
import { useAppDispatch, useAppSelector } from '../hooks'
import { ShoppingCartItem, ShoppingCartItemId } from '../types'
import { deleteItem, modifyItemQuantity } from '../reducers/shoppingCartReducer'
import { useNavigate } from 'react-router-dom'

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`
}

function total(items: readonly ShoppingCartItem[]) {
  return items
    .map((item) => item.product.price * item.quantity)
    .reduce((sum, i) => sum + i, 0)
}

const ShoppingCart = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const items = useAppSelector((state) => state.shoppingCart)
  const invoiceTotal = total(items)

  const handleModifyItem =
    (id: ShoppingCartItemId, quantity: number) =>
    (event: React.SyntheticEvent) => {
      event.preventDefault
      dispatch(modifyItemQuantity(id, quantity))
    }

  const handleRemoveItem =
    (id: ShoppingCartItemId) => (event: React.SyntheticEvent) => {
      event.preventDefault
      dispatch(deleteItem(id))
    }

  const handleCheckout = () => navigate('/checkout')

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Total</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.product.title}</TableCell>
              <TableCell sx={{ width: '150px' }}>
                {' '}
                <IconButton
                  aria-label='add'
                  size='medium'
                  onClick={handleModifyItem(item.id, item.quantity + 1)}
                >
                  <AddIcon fontSize='inherit' />
                </IconButton>{' '}
                {item.quantity}{' '}
                <IconButton
                  aria-label='remove'
                  size='medium'
                  onClick={handleModifyItem(item.id, item.quantity - 1)}
                >
                  <RemoveIcon fontSize='inherit' />
                </IconButton>
              </TableCell>
              <TableCell>{item.product.price}</TableCell>
              <TableCell>
                {ccyFormat(item.quantity * item.product.price)}
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label='delete'
                  size='medium'
                  onClick={handleRemoveItem(item.id)}
                >
                  <DeleteIcon fontSize='inherit' />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={2} />
            <TableCell colSpan={1}>
              <b>Total</b>
            </TableCell>
            <TableCell>{ccyFormat(invoiceTotal)}</TableCell>
            <TableCell>
              {' '}
              <BasicButton
                color='success'
                name='CHECKOUT'
                starIcon={<PointOfSaleIcon />}
                onClick={handleCheckout}
              ></BasicButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default ShoppingCart
