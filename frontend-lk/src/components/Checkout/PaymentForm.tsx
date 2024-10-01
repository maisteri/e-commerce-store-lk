import * as React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { Payment } from '../../types'

interface PaymentFormProps {
  control: Control<Payment>
  errors: FieldErrors<Payment>
}

export default function PaymentForm({ errors, control }: PaymentFormProps) {
  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Controller
            name='nameOnCard'
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.nameOnCard}
                helperText={errors.nameOnCard?.message}
                required
                id='cardName'
                label='Name on card'
                fullWidth
                autoComplete='cc-name'
                variant='standard'
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name='cardNumber'
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.cardNumber}
                helperText={errors.cardNumber?.message}
                required
                id='cardNumber'
                label='Card number'
                fullWidth
                autoComplete='cc-number'
                variant='standard'
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name='expiryDate'
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.expiryDate}
                helperText={errors.expiryDate?.message}
                required
                id='expiryDate'
                label='Expiry date'
                fullWidth
                autoComplete='cc-exp'
                variant='standard'
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name='cvv'
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.cvv}
                helperText={errors.cvv?.message}
                required
                id='cvv'
                label='CVV'
                fullWidth
                autoComplete='cc-csc'
                variant='standard'
              />
            )}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

