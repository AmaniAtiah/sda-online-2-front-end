import AdminSidebar from "@/components/layout/sidebars/AdminSidebar"
import { AppDispatch } from "@/toolkit/store"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import useCategoriesState from "@/hooks/useCategoriesState"
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory
} from "@/toolkit/slices/categorySlice"
import { SubmitHandler, useForm } from "react-hook-form"
import { Category, CreateCategoryFormData } from "@/types"

export const AdminCategoriesManagement = () => {
  const { categories, isLoading, error, totalPages } = useCategoriesState()

  const dispatch: AppDispatch = useDispatch()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<CreateCategoryFormData>()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(3)
  const [isEdit, setIsEdit] = useState(false)
  // const [categoryName, setCategoryName] = useState("")
  // const [categoryDescription, setCategoryDescription] = useState("")
  const [selectedCategoryId, setSelectedCategoryId] = useState("")

  //   console.log(products)
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories({ pageNumber, pageSize }))
    }
    fetchData()
  }, [pageNumber])

  const handlePrevPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }
  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }

  const onSubmit: SubmitHandler<CreateCategoryFormData> = async (data) => {
    try {
      if (isEdit) {
        await dispatch(
          updateCategory({ updaterCategoryData: data, categoryId: selectedCategoryId })
        )
        setIsEdit(false)
      } else {
        await dispatch(createCategory(data))
      }
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (category: Category) => {
    setIsEdit(true)
    setSelectedCategoryId(category.categoryId)
    setValue("name", category.name)
    setValue("description", category.description)
  }

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteCategory(id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container flex-space-around">
      <AdminSidebar />
      <div className="main-container">
        {isLoading && <h2>Loading...</h2>}
        {error && <p>Error{error}</p>}

        <div className="card">
          <h2>{isEdit ? "Edit Category" : "Create Category"}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-field">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                {...register("name", {
                  required: "name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters"
                  }
                })}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div className="form-field">
              <label htmlFor="description">Description: </label>
              <textarea id="" {...register("description")}></textarea>
            </div>

            <button type="submit" className="btn">
              {isEdit ? "Update Category" : "Create Category"}
            </button>
          </form>
        </div>
        <br />

        <h2>List of Categories</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.length > 0 &&
              categories.map((category) => (
                // <SingleCategory key={category.categoryId} category={category} />
                <tr key={category.categoryId}>
                  <td>{category.name}</td>
                  <td>{category.description.substring(0, 100)}...</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => {
                        handleEdit(category)
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn delete-btn "
                      onClick={() => {
                        handleDelete(category.categoryId)
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={handlePrevPage} disabled={pageNumber === 1}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => setPageNumber(index + 1)}>
              {index + 1}
            </button>
          ))}
          <button onClick={handleNextPage} disabled={pageNumber === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
