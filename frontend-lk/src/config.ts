export const apiBaseUrl =
  import.meta.env.VITE_ENV === 'development'
    ? 'http://localhost:3000/v1/api'
    : 'https://e-commerce-store-lk.onrender.com/v1/api'
