import { Button } from "@/components/ui/button"
import { loginUser } from "@/toolkit/slices/userSlice"
import { AppDispatch } from "@/toolkit/store"
import { LoginFormData } from "@/types"
import { toastError, toastSuccess } from "@/utils/helper"

import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

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
      // console.log("Response from Register:" + response)
      const isAdmin = response.payload.data.loggedInUser.isAdmin
      navigate(isAdmin ? "/dashboard/admin" : "/dashboard/user")
      // toastSuccess(response.payload.message)
      // navigate("/dashboard/user")
    } catch (error: any) {
      toastError(error.message || "Login failed")
    }
  }
  return (
    <div className="register ">
      <h2>User Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-field mb-2">
          <label htmlFor="email"> Email: </label>
          <input
            type="text"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^@ ]+@[^@ ]+\.[^@. ]{2,}$/, message: "Email is not valid" }
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="form-field mb-2">
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
        <Button className="btn" type="submit">
          Login
        </Button>
      </form>
    </div>
  )
}
