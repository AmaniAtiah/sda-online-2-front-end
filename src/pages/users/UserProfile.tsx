import UserSidebar from "@/components/layout/sidebars/UserSidebar"
import useUsersState from "@/hooks/useUsersState"
import { updateUser } from "@/toolkit/slices/userSlice"
import { AppDispatch } from "@/toolkit/store"
import { UpdateProfileFormData } from "@/types"
import { toastError } from "@/utils/helper"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

export const UserProfile = () => {
  const { userData } = useUsersState()
  const dispatch: AppDispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateProfileFormData>()

  const [isFormOpen, setIsFormOpen] = useState(false)

  const onSubmit: SubmitHandler<UpdateProfileFormData> = async (data) => {
    if (!userData?.userId) {
      toastError("user data is not avaliable")
      return
    }
    try {
      const response = await dispatch(
        updateUser({ updaterUserData: data, userId: userData?.userId })
      )
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="container flex-space-around">
      <UserSidebar />
      <div className="main-container">
        {userData && (
          <>
            <h3>FirstName: {userData.firstName}</h3>
            <p>LastName: {userData.lastName}</p>

            <p>Email: {userData.email}</p>
            <p>Address: {userData.address}</p>
            <button
              className="btn"
              onClick={() => {
                setIsFormOpen(!isFormOpen)
              }}
            >
              {isFormOpen ? "close Edit user Info" : "Edit user Info"}
            </button>

            {isFormOpen && (
              <form onSubmit={handleSubmit(onSubmit)}>
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
                  <label htmlFor="address">Address: </label>
                  <textarea id="" {...register("address")}></textarea>
                </div>
                <button type="submit" className="btn">
                  Update Profile
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  )
}
