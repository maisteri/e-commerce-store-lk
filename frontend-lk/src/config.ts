export const env = import.meta.env.VITE_ENV || 'production'

export const apiBaseUrl =
  env === 'development'
    ? 'http://localhost:3000/v1/api'
    : 'https://e-commerce-store-lk-api.onrender.com/v1/api'
