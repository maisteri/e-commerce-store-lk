export type UserId = string | null

export type ProductId = number

export interface Product {
  id: ProductId
  title: string
  price: number
  description: string
  imageUrl: string
  rating: number
  numberOfRatings: number
  category: string
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

export interface UserData {
  token: string
  name: string
}
