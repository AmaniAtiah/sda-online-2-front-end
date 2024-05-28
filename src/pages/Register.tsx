import React from "react"
import { Button, Typography } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { registerUser } from "@/toolkit/slices/userSlice"
import { AppDispatch } from "@/toolkit/store"
import { RegisterFormData } from "@/types"
import { toastError, toastSuccess } from "@/utils/helper"

export const Register = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>()

  const dispatch: AppDispatch = useDispatch()

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      const response = await dispatch(registerUser(data))
      toastSuccess(response.payload.message)
      navigate("/login")
    } catch (error: any) {
      toastError(error.message || "Registration failed")
    }
  }

  return (
    <div className="register flex justify-center items-center h-screen">
      <div className="w-96 p-6 bg-gray-100 rounded-lg shadow-lg">
        <Typography variant="h5" className="mb-4">
          User Registration
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="userName" className="block">
              User Name:
            </label>
            <input
              type="text"
              {...register("userName", {
                required: "User Name is required",
                minLength: { value: 2, message: "User Name must be at least 2 characters" }
              })}
              className="w-full border rounded-md p-2"
            />
            {errors.userName && <p className="text-red-500">{errors.userName.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block">
              Email:
            </label>
            <input
              type="email"
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
          <div>
            <label htmlFor="firstName" className="block">
              First Name:
            </label>
            <input
              type="text"
              {...register("firstName", {
                required: "First Name is required",
                minLength: { value: 2, message: "First Name must be at least 2 characters" }
              })}
              className="w-full border rounded-md p-2"
            />
            {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block">
              Last Name:
            </label>
            <input
              type="text"
              {...register("lastName", {
                required: "Last Name is required",
                minLength: { value: 2, message: "Last Name must be at least 2 characters" }
              })}
              className="w-full border rounded-md p-2"
            />
            {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block">
              Phone Number:
            </label>
            <input
              type="text"
              {...register("phoneNumber", {
                minLength: { value: 10, message: "Phone number must be 10 numbers" }
              })}
              className="w-full border rounded-md p-2"
            />
            {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
          </div>
          <div>
            <label htmlFor="address" className="block">
              Address:
            </label>
            <textarea
              id="address"
              {...register("address")}
              className="w-full border rounded-md p-2"
            ></textarea>
          </div>
          <Button variant="contained" type="submit" className="button__login">
            Register
          </Button>
        </form>
      </div>
    </div>
  )
}
