import * as React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { useAppSelector } from '../../hooks'

interface AddressFormProps {
  control: Control<{
    firstName: string
    lastName: string
    streetAddress: string
    city: string
    zip: string
    country: string
  }>
  errors: FieldErrors<{
    firstName: string
    lastName: string
    streetAddress: string
    city: string
    zip: string
    country: string
  }>
}

const AddressForm = ({ errors, control }: AddressFormProps) => {
  const deliveryAddress = useAppSelector(
    (state) => state.general.deliveryAddress
  )

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Controller
            name='firstName'
            control={control}
            defaultValue={deliveryAddress?.firstName || ''}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                id='firstName'
                required
                label='First name'
                fullWidth
                autoComplete='given-name'
                variant='standard'
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='lastName'
            control={control}
            defaultValue={deliveryAddress?.lastName || ''}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                id='lastName'
                required
                label='Last name'
                fullWidth
                autoComplete='family-name'
                variant='standard'
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name='streetAddress'
            control={control}
            defaultValue={deliveryAddress?.streetAddress || ''}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.streetAddress}
                helperText={errors.streetAddress?.message}
                required
                id='address'
                label='Address line'
                fullWidth
                autoComplete='address-line1'
                variant='standard'
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='city'
            control={control}
            defaultValue={deliveryAddress?.city || ''}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.city}
                helperText={errors.city?.message}
                id='city'
                label='City'
                fullWidth
                autoComplete='address-level2'
                variant='standard'
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='zip'
            control={control}
            defaultValue={deliveryAddress?.zip || ''}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.zip}
                helperText={errors.zip?.message}
                required
                id='zip'
                label='Zip / Postal code'
                fullWidth
                autoComplete='postal-code'
                variant='standard'
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='country'
            control={control}
            defaultValue={deliveryAddress?.country || ''}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.country}
                helperText={errors.country?.message}
                required
                id='country'
                label='Country'
                fullWidth
                autoComplete='country'
                variant='standard'
              />
            )}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
export default AddressForm

