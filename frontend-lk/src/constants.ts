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
