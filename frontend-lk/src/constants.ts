import { NotificationIf } from './types'

export const DISABLE_NOTIFICATION: NotificationIf = {
  message: '',
  severity: 'success',
}

export const SUCCESSFUL_LOGIN: NotificationIf = {
  message: 'Login Succesful!',
  severity: 'success',
}

export const UNKNOWN_ERROR: NotificationIf = {
  message: 'Unknown error',
  severity: 'error',
}

export const SUCCESSFUL_RATING: NotificationIf = {
  message: 'Product rated! Thank you!',
  severity: 'success',
}

export const UNSUCCESSFUL_RATING: NotificationIf = {
  message: 'Something went wrong :/',
  severity: 'error',
}
