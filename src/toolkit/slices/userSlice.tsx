import api from "@/api"
import { LoginFormData, UpdateProfileFormData, User, UserState } from "@/types"
import { getLocalStorage, getToken, setLocalStorage } from "@/utils/localStorage"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Activity } from "lucide-react"

const data = getLocalStorage("loginData", {
  userData: null,
  token: null,
  isLoggedIn: false
})

const initialState: UserState = {
  users: [],
  totalPages: 1,
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
  // console.log(response)
  return response.data
})

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({
    updaterUserData,
    userId
  }: {
    updaterUserData: UpdateProfileFormData
    userId: string
  }) => {
    const response = await api.put(`/users/${userId}`, updaterUserData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    // console.log(response)
    return response.data
  }
)

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ pageNumber, pageSize }: { pageNumber: number; pageSize: number }) => {
    const response = await api.get(`/users?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

    //   console.log(response.data)
    return response.data
  }
)

// unban user
export const banUnbanUser = createAsyncThunk("users/banUnbanUser", async (userId: string) => {
  await api.put(
    `/users/ban-unban/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  )
  // console.log(response)
  return userId
})
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isLoggedIn = false
      state.userData = null
      state.token = null
      setLocalStorage("loginData", {
        isLoggedIn: state.isLoggedIn,
        userData: state.userData,
        token: state.token
      })
    }
  },

  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload.data.loggedInUser
      state.token = action.payload.data.token
      setLocalStorage("loginData", {
        isLoggedIn: state.isLoggedIn,
        userData: state.userData,
        token: state.token
      })
    })

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      console.log(action.payload.data.items)
      state.users = action.payload.data.items
      state.totalPages = action.payload.data.totalPages
      state.isLoading = false
    })

    builder.addCase(banUnbanUser.fulfilled, (state, action) => {
      const foundUser = state.users.find((user) => user.userId === action.payload)
      if (foundUser) {
        foundUser.isBanned = !foundUser.isBanned
      }
      state.isLoading = false
    })

    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log(action.payload.data)
      // state.isLoggedIn = true
      if (state.userData) {
        state.userData.firstName = action.payload.data.firstName
        state.userData.lastName = action.payload.data.lastName
        state.userData.address = action.payload.data.firstName
        setLocalStorage("loginData", {
          isLoggedIn: state.isLoggedIn,
          userData: state.userData,
          token: state.token
        })
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
      (state) => {
        state.error = "An error occurred"
        state.isLoading = false
      }
    )
  }
})

export const { logoutUser } = userSlice.actions
export default userSlice.reducer
