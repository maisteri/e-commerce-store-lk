import * as React from 'react'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Grid from '@mui/material/Grid'
import { useAppSelector } from '../../hooks'

const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
]

export default function Review() {
  const cart = useAppSelector((state) => state.shoppingCart)
  const address = useAppSelector((state) => state.general.deliveryAddress)

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Order summary
      </Typography>

      <List disablePadding>
        {cart.map((item) => (
          <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={item.product.title}
              secondary={`Quantity: ${item.quantity}`}
            />
            <Typography variant='body2'>
              {item.product.price * item.quantity} €
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
            {cart.reduce(
              (total, item) => total + item.product.price * item.quantity,
              0
            )}{' '}
            €
          </Typography>
        </ListItem>
      </List>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography
            gutterBottom
          >{`${address?.firstName} ${address?.lastName}`}</Typography>
          <Typography gutterBottom>{`${address?.streetAddress}`}</Typography>
          <Typography
            gutterBottom
          >{`${address?.zip} ${address?.city}`}</Typography>
          <Typography gutterBottom>{`${address?.country}`}</Typography>
        </Grid>

        <Grid item container direction='column' xs={12} sm={6}>
          <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

