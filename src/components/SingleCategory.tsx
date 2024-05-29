import { deleteCategory } from "@/toolkit/slices/categorySlice"
import { AppDispatch } from "@/toolkit/store"
import { Category } from "@/types"
import React from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
const SingleCategory = (props: { category: Category }) => {
  const { category } = props

  const dispatch: AppDispatch = useDispatch()

  const handleDelete = async (id: string) => {
    dispatch(deleteCategory(id))
    try {
      const response = await dispatch(deleteCategory(id))
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (id: string) => {
    console.log(id)
    // dispatch(deleteCategory(id))
    // try {
    //   const response = await dispatch(deleteCategory(id))
    //   console.log(response)
    // } catch (error) {
    //   console.log(error)
    // }
  }
  return (
    <article className=" product card">
      <div className="category__body">
        <h3 className="category__name">{category.name}</h3>
        <p className="category__details">{category.description.substring(0, 100)}...</p>
        <div>
          <button
            className="btn"
            onClick={() => {
              handleEdit(category.categoryId)
            }}
          >
            Edit
          </button>
          <button
            className="btn"
            onClick={() => {
              handleDelete(category.categoryId)
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}

export default SingleCategory
