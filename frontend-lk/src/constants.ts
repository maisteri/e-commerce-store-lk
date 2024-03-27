import { NotificationIf } from './types'

export const DISABLE_SUCCESS_NOTIFICATION: NotificationIf = {
  message: '',
  severity: 'success',
}

export const DISABLE_ERROR_NOTIFICATION: NotificationIf = {
  message: '',
  severity: 'error',
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

export const CREDIT_CARD_INFO: NotificationIf = {
  message:
    "Credit card info not saved. This is a fake store. Don't insert real credit card info!",
  severity: 'error',
}
