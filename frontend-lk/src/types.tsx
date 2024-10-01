import { AlertColor } from '@mui/material/Alert'

export type UserId = string | null

export type ProductId = number

type Rating = number

export interface Product {
  id: ProductId
  title: string
  price: number
  description: string
  imageUrl: string
  rating: Rating
  numberOfRatings: number
  category: string
}

export interface postRatingParams {
  rating: Rating
  productId: ProductId
}

export interface RatingComponentProps {
  rating: Rating
  numberOfRatings: number
  productId: ProductId
}

export type ShoppingCartItemId = number

export interface ShoppingCartItem {
  id: ShoppingCartItemId
  quantity: number
  productId: ProductId
  product: Pick<Product, 'title' | 'price' | 'imageUrl'>
}

export interface Credentials {
  username: string
  password: string
}

export interface CredentialsWithRemember {
  username: string
  password: string
  remember: boolean
  navigateToStore: NavLink
}

export type NavLink = () => void

export interface UserData {
  token: string
  name: string
}

export interface NewUser {
  name: string
  username: string
  password: string
}

export interface InitialGeneralState {
  sideDrawerOpen: boolean
  categories: string[]
  searchFilter: SearchFilter
  categorySelected: CategorySelected
  products: Product[]
  notification: NotificationIf
  sortOrder: SortOrder
  deliveryAddress: AddressWithId | null
  paymentInfo: Payment | null
}

export interface NotificationIf {
  message: string
  severity: AlertColor
}

export type SearchFilter = string
export type CategorySelected = string

export type SortOrder = 'price, ascending' | 'price, descending' | 'rating' | ''

export type AddressId = number

export interface Address {
  firstName: string
  lastName: string
  streetAddress: string
  city: string
  zip: string
  country: string
}

export interface Payment {
  nameOnCard: string
  cardNumber: string
  expiryDate: string
  cvv: string
}

export interface AddressWithId extends Address {
  addressId: AddressId
}

export type PaymentMethods = 'creditcard'

export type DeliveryMethods = 'budbee'

export type OrderId = number

export interface Order {
  addressId: AddressId
  deliveryMethod: DeliveryMethods
  paymentMethod: PaymentMethods
}
