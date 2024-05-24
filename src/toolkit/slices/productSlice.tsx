import api from "@/api"
import { CreateProductForBackend, CreateProductFormData, Product, ProductState } from "@/types"
import { getToken } from "@/utils/localStorage"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useEffect } from "react"
import { fetchCategories } from "./categorySlice"

const initialState: ProductState = {
  products: [],
  totalPages: 1,
  product: null,
  error: null,
  isLoading: false
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({
    pageNumber,
    pageSize,
    searchTerm = "",
    sortBy = "",
    sortDirection = ""
  }: {
    pageNumber: number
    pageSize: number
    searchTerm?: string
    sortBy?: string
    sortDirection?: string
  }) => {
    const response =
      searchTerm.length > 0
        ? await api.get(
            `/products?pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}`
          )
        : await api.get(
            `/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`
          )

    //   console.log(response.data)
    return response.data
  }
)

// fetch product
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId: string | undefined) => {
    const response = await api.get(`/products/${productId}`)
    return response.data
  }
)

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: string) => {
    await api.delete(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return productId
  }
)

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (newProduct: CreateProductForBackend) => {
    const response = await api.post(`/products`, newProduct, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    // console.log(response.data.data)
    return response.data.data
  }
)

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({
    updateProductData,
    productId
  }: {
    updateProductData: CreateProductForBackend
    productId: string
  }) => {
    const response = await api.put(`/products/${productId}`, updateProductData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    // console.log(response)
    return response.data
  }
)

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      console.log(action.payload.data.items)
      state.products = action.payload.data.items
      state.totalPages = action.payload.data.totalPages
      state.isLoading = false
    })

    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      // console.log(action.payload.data)
      state.product = action.payload.data
      state.isLoading = false
    })

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      // console.log(action.payload.data.items)
      state.products = state.products.filter((product) => product.productId !== action.payload)
      state.isLoading = false
    })

    builder.addCase(createProduct.fulfilled, (state, action) => {
      // console.log(action.payload.data.items)
      state.products.push(action.payload)
      state.isLoading = false
    })

    // builder.addCase(updateProduct.fulfilled, (state, action) => {
    //   console.log(action.payload.data)
    //   const foundProduct = state.products.find(
    //     (product) => product.productId === action.payload.data.productId
    //   )
    //   if (foundProduct) {
    //     foundProduct.image = action.payload.data.image

    //     foundProduct.categoriesId = action.payload.data.categoriesId

    //     foundProduct.price = action.payload.data.price
    //     foundProduct.quantity = action.payload.data.quantity
    //     foundProduct.name = action.payload.data.name
    //     foundProduct.description = action.payload.data.description
    //   }
    // })

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const updatedProduct = action.payload.data // Assuming the server response includes the updated product data with the category name
      const existingProductIndex = state.products.findIndex(
        (product) => product.productId === updatedProduct.productId
      )

      if (existingProductIndex !== -1) {
        state.products[existingProductIndex] = updatedProduct
      }
    })

    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.error = null
        state.isLoading = true
      }
    )
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state, action) => {
        state.error = "An error occured"
        state.isLoading = false
      }
    )
  }
})

export default productSlice.reducer
