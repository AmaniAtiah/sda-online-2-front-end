import { registerUser } from "@/toolkit/slices/userSlice"
import { AppDispatch } from "@/toolkit/store"
import { toastError, toastSuccess } from "@/utils/toast"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

type FormData = {
  userName: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
  address: string
}
export const Register = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  //   const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
  //     console.log(data)
  //   }

  const dispatch: AppDispatch = useDispatch()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await dispatch(registerUser(data))
      console.log("Response from Register:" + response)
      console.log(response.payload.message)
      toastSuccess(response.payload.message)
      navigate("/login")
    } catch (error: any) {
      toastError(error.message || "Registration failed")
    }
  }

  return (
    <div className="register">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-field">
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            {...register("userName", {
              required: "UserName is required",

              minLength: {
                value: 2,
                message: "User Name must be at least 2 characters"
              }
            })}
          />
          {errors.userName && <p>{errors.userName.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="email"> Email: </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^@ ]+@[^@ ]+\.[^@. ]{2,}$/, message: "Email is not valid" }
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="password"> Password: </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters" }
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            {...register("firstName", {
              required: "firstName is required",
              minLength: {
                value: 2,
                message: "First Name must be at least 2 characters"
              }
            })}
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            {...register("lastName", {
              required: "lastName is required",
              minLength: {
                value: 2,
                message: "Last Name must be at least 2 characters"
              }
            })}
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            {...register("phoneNumber", {
              minLength: {
                value: 10,
                message: "phone number must be  10 numbers"
              }
            })}
          />
          {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="address">Address: </label>
          <textarea id="" {...register("address")}></textarea>
        </div>
        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </div>
  )
}
