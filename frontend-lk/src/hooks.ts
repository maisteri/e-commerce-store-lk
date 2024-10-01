// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addressSchema, creditCardSchema } from './utils'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAddressForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addressSchema),
    mode: 'onBlur',
  })

  return {
    handleAddressSubmit: handleSubmit,
    addressControl: control,
    addressErrors: errors,
  }
}

export const usePaymentForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(creditCardSchema),
    mode: 'onBlur',
  })

  return {
    handlePaymentSubmit: handleSubmit,
    paymentControl: control,
    paymentErrors: errors,
  }
}
