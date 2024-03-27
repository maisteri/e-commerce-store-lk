import * as React from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useAppDispatch, useAppSelector } from '../hooks'
import { setNotification } from '../reducers/siteGeneralReducer'
import {
  DISABLE_ERROR_NOTIFICATION,
  DISABLE_SUCCESS_NOTIFICATION,
} from '../constants'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const Notification = () => {
  const notification = useAppSelector((state) => state.general.notification)
  const dispatch = useAppDispatch()
  const message = notification.message
  const messageSeverity = notification.severity
  const open = Boolean(message)

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(
      setNotification(
        notification.severity === 'success'
          ? DISABLE_SUCCESS_NOTIFICATION
          : DISABLE_ERROR_NOTIFICATION
      )
    )
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {/* <Button variant='outlined' onClick={handleClick}>
        Open success snackbar
      </Button> */}
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={messageSeverity}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  )
}

export default Notification
