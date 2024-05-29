export type Category = {
  categoryId: string
  name: string
  slug: string
  description: string
  products: Product[]
  createAt: string
}

export type CategoryState = {
  categories: Category[]
  totalPages: number
  category: Category | null
  error: null | string
  isLoading: boolean
}
export type Product = {
  productId: string
  name: string
  description: string
  price: number
  image?: string
  color: string
  size: string
  brand: string
  quantity: number
  createAt: string
  categoriesId: string
  category: Category
}

export type ProductState = {
  products: Product[]
  totalPages: number
  product: Product | null
  error: null | string
  isLoading: boolean
}

export type CartItem = Product & { orderQuantity: number }

export type CartState = {
  cartItems: CartItem[]
}

export type User = {
  userId?: string
  userName: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
  isAdmin?: boolean
  isBanned?: boolean
  createAt?: string
  updateAt?: string
}

export type UserState = {
  users: User[]
  totalPages: number
  error: null | string
  isLoading: boolean
  userData: User | null
  token: string | null
  isLoggedIn: boolean
}

export type LoginFormData = {
  email: string
  password: string
}

export type LoginData = {
  isLoggedIn: boolean
  userData: User | null
  token: string
}

export type RegisterFormData = {
  userName: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
  address: string
}

export type UpdateProfileFormData = {
  firstName: string
  lastName: string
  address: string
}

export type CreateCategoryFormData = {
  name: string
  description: string
}

export type CreateProductFormData = {
  // productId: string
  name: string
  description: string
  price: number
  image: FileList
  quantity: number
  categoriesId: string
  // category: Category
}

export type CreateProductForBackend = {
  name: string
  description: string
  price: number
  image: string
  quantity: number
  categoriesId: string
}

export type Order = {
  orderId: string
  orderDate: string
  totalPrice: number
  status: string

  userId: string
  user: User
}

export type OrderState = {
  orders: Order[]
  totalPages: number
  order: Order | null
  error: null | string
  isLoading: boolean
}

// create a new Order
export type CreateOrder = {
  productIds: string[]
}
