import api from "@/api"
import {
  Category,
  CategoryState,
  CreateCategoryFormData,
  ProductState,
  UpdateProfileFormData
} from "@/types"
import { getToken, setLocalStorage } from "@/utils/localStorage"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useEffect } from "react"

const initialState: CategoryState = {
  categories: [],
  totalPages: 1,
  category: null,
  error: null,
  isLoading: false
}

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async ({ pageNumber, pageSize }: { pageNumber: number; pageSize: number }) => {
    const response = await api.get(`/categories?pageNumber=${pageNumber}&pageSize=${pageSize}`)

    return response.data
  }
)

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId: string) => {
    await api.delete(`/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return categoryId
  }
)

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (newCategory: CreateCategoryFormData) => {
    const response = await api.post(`/categories`, newCategory, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    // console.log(response.data.data)
    return response.data.data
  }
)

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({
    updaterCategoryData,
    categoryId
  }: {
    updaterCategoryData: CreateCategoryFormData
    categoryId: string
  }) => {
    const response = await api.put(`/categories/${categoryId}`, updaterCategoryData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    // console.log(response)
    return response.data
  }
)
const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      // console.log(action.payload.data.items)
      state.categories = action.payload.data.items
      state.totalPages = action.payload.data.totalPages
      state.isLoading = false
    })

    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      // console.log(action.payload.data.items)
      state.categories = state.categories.filter(
        (category) => category.categoryId !== action.payload
      )
      state.isLoading = false
    })

    builder.addCase(createCategory.fulfilled, (state, action) => {
      // console.log(action.payload.data.items)
      state.categories.push(action.payload)
      state.isLoading = false
    })

    builder.addCase(updateCategory.fulfilled, (state, action) => {
      console.log(action.payload.data)
      const foundCategory = state.categories.find(
        (category) => category.categoryId === action.payload.data.categoryId
      )
      if (foundCategory) {
        foundCategory.name = action.payload.data.name
        foundCategory.description = action.payload.data.description
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

export default categorySlice.reducer
