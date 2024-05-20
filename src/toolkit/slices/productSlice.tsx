import api from "@/api"
import { ProductState } from "@/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useEffect } from "react"

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
    searchTerm,
    sortBy,
    sortDirection
  }: {
    pageNumber: number
    pageSize: number
    searchTerm: string
    sortBy: string
    sortDirection: string
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
