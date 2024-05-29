import React from "react"
import { Button, Typography } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginUser } from "@/toolkit/slices/userSlice"
import { AppDispatch } from "@/toolkit/store"
import { LoginFormData } from "@/types"
import { toastError } from "@/utils/helper"

export const Login = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>()

  const dispatch: AppDispatch = useDispatch()

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await dispatch(loginUser(data))
      const isAdmin = response.payload.data.loggedInUser.isAdmin
      navigate(isAdmin ? "/dashboard/admin" : "/dashboard/user")
    } catch (error: any) {
      toastError(error.message || "Login failed")
    }
  }

  return (
    <div className=" main-container ">
      <div className=" main-container flex justify-center items-center h-screen">
        <div className="w-96 p-6 bg-gray-100 rounded-lg shadow-lg">
          <Typography variant="h5" className="mb-4">
            User Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block">
                Email:
              </label>
              <input
                type="text"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[^@ ]+@[^@ ]+\.[^@. ]{2,}$/, message: "Email is not valid" }
                })}
                className="w-full border rounded-md p-2"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block">
                Password:
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" }
                })}
                className="w-full border rounded-md p-2"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <Button variant="contained" type="submit" className="button__login">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
