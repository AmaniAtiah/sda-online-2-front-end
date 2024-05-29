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
    <div className="container main-container mx-auto flex">
      <AdminSidebar />
      <div className="flex-grow">
        {isLoading && <h2>Loading...</h2>}
        {error && <p>Error: {error}</p>}

        <div className="card p-4">
          <h2 className="text-xl font-bold mb-4">{isEdit ? "Edit Category" : "Create Category"}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-field mb-4">
              <label htmlFor="name" className="block mb-2">
                Name:
              </label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters"
                  }
                })}
                className="border border-gray-300 rounded px-3 py-2 "
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            <div className="form-field mb-4">
              <label htmlFor="description" className="block mb-2">
                Description:
              </label>
              <textarea
                id="description"
                {...register("description")}
                className="border border-gray-300 rounded px-3 py-2 "
              ></textarea>
            </div>

            <button type="submit" className=" button__add  px-4 rounded ">
              {isEdit ? "Update Category" : "Create Category"}
            </button>
          </form>
        </div>
        <br />

        <h2 className="text-xl font-bold">List of Categories</h2>

        <table className="w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.length > 0 &&
              categories.map((category, index) => (
                <tr
                  key={category.categoryId}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="py-2 px-4 border">{category.name}</td>
                  <td className="py-2 px-4 border">{category.description.substring(0, 100)}...</td>
                  <td className="py-2 px-4 border">
                    <button
                      className="button__edit  py-1 px-2 rounded  mr-2"
                      onClick={() => handleEdit(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="button__delete  py-1 px-2 rounded "
                      onClick={() => handleDelete(category.categoryId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="pagination mt-4">
          <button
            onClick={handlePrevPage}
            disabled={pageNumber === 1}
            className="btn bg-gray-200 text-gray-700 py-1 px-2 rounded mr-2"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setPageNumber(index + 1)}
              className={`btn bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 ${
                pageNumber === index + 1 ? "bg-blue-600" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={pageNumber === totalPages}
            className="btn bg-gray-200 text-gray-700 py-1 px-2 rounded ml-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
