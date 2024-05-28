import api from "@/api"
import {
  Category,
  CategoryState,
  CreateCategoryFormData,
  OrderState,
  ProductState,
  UpdateProfileFormData
} from "@/types"
import { getToken, setLocalStorage } from "@/utils/localStorage"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Console } from "console"
import { useEffect } from "react"

const initialState: OrderState = {
  orders: [],
  totalPages: 1,
  order: null,
  error: null,
  isLoading: false
}

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async ({ pageNumber, pageSize }: { pageNumber: number; pageSize: number }) => {
    const response = await api.get(`/orders?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

    return response.data
  }
)

export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchOrderDetails",
  async (orderId: string | undefined) => {
    const response = await api.get(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

    return response.data
  }
)

// export const createOrder = createAsyncThunk(
//   "orders/createOrder",
//   async ({ userId, productIds }: { userId: string; productIds: string[] }) => {
//     const response = await api.post(`/orders/${userId}/add-order`, productIds, {
//       headers: {
//         Authorization: `Bearer ${getToken()}`
//       }
//     })
//     // console.log(response)
//     return response.data
//   }
// )

type CreateOrderPayload = {
  userId: string
  productIds: string[]
  totalPrice: number
}

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ userId, productIds, totalPrice }: CreateOrderPayload) => {
    const response = await api.post(
      `/orders/${userId}/add-order`,
      { productIds, totalPrice },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    )
    return response.data
  }
)
// export const createOrder = createAsyncThunk(
//   "orders/createOrder",
//   async ({ userId, productIds } : {}) => {

//       const response = await api.post(`/orders/${userId}/add-order`, { productIds }, {
//         headers: {
//           Authorization: `Bearer ${getToken()}`,
//         },
//       });
//       return response.data;

//   }
// );

// create order

const orderSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      console.log(action.payload.data.items)
      state.orders = action.payload.data.items

      state.totalPages = action.payload.data.totalPages
      state.isLoading = false
    })

    builder
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        console.log(action.payload.data)
        state.order = action.payload.data
        //print
        state.isLoading = false
      })

      // createt order
      .addCase(createOrder.fulfilled, (state, action) => {
        console.log(action.payload.data)
        state.order = action.payload.data
        state.isLoading = false
      })
    // builder.addCase(createOrder.fulfilled, (state, action) => {
    //   console.log(action.payload.data)
    //   state.orders.push(action.payload.data)
    //   state.isLoading = false
    // })

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

export default orderSlice.reducer
