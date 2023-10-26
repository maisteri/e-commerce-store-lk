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
import BasicButton from './BasicButton'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'

export interface ShoppingCartItem {
  title: string
  quantity: number
  price: number
  id: number
}

export interface ShoppingCartProps {
  items: ShoppingCartItem[]
}

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`
}

function total(items: readonly ShoppingCartItem[]) {
  return items
    .map(({ price, quantity }) => price * quantity)
    .reduce((sum, i) => sum + i, 0)
}

const ShoppingCart = (props: ShoppingCartProps) => {
  const items = props.items
  const invoiceTotal = total(items)

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
              <TableCell>{item.title}</TableCell>
              <TableCell>
                {' '}
                <IconButton aria-label='add' size='medium'>
                  <AddIcon fontSize='inherit' />
                </IconButton>{' '}
                {item.quantity}{' '}
                <IconButton aria-label='remove' size='medium'>
                  <RemoveIcon fontSize='inherit' />
                </IconButton>
              </TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.quantity * item.price}</TableCell>
              <TableCell>
                <IconButton aria-label='delete' size='medium'>
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
              ></BasicButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default ShoppingCart
