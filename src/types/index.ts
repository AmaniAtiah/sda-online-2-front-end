export type Category = {
  categoryId: string
  name: string
  slug: string
  description: string
  products: Product[]
}
export type Product = {
  productId: string
  name: string
  description: string
  price: number
  image: string
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

export type User = {
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
  error: null | string
  isLoading: boolean
}

export type LoginFormData = {
  email: string
  password: string
}
