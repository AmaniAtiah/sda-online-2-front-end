import api from "@/api"
import { LoginFormData, User, UserState } from "@/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const data =
  localStorage.getItem("loginData") !== null
    ? JSON.parse(String(localStorage.getItem("loginData")))
    : []

const initialState: UserState = {
  error: null,
  isLoading: false,
  userData: data.userData,
  token: data.token,
  isLoggedIn: data.isLoggedIn
}

export const registerUser = createAsyncThunk("users/registerUser", async (newUser: User) => {
  const response = await api.post(`/auth/register`, newUser)
  //   console.log(response.data)
  return response.data
})
export const loginUser = createAsyncThunk("users/loginUser", async (userData: LoginFormData) => {
  const response = await api.post(`/auth/login`, userData)
  console.log(response)
  return response.data
})

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isLoggedIn = false
      state.userData = null
      state.token = null
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData,
          token: state.token
        })
      )
    }
  },

  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload.data.loggedInUser
      state.token = action.payload.data.token
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData,
          token: state.token
        })
      )
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
      (state) => {
        state.error = "An error occurred"
        state.isLoading = false
      }
    )
  }
})

export const { logoutUser } = userSlice.actions
export default userSlice.reducer
