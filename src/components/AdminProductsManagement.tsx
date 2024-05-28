import AdminSidebar from "@/components/layout/sidebars/AdminSidebar"
import { AppDispatch } from "@/toolkit/store"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import useCategoriesState from "@/hooks/useCategoriesState"
import { fetchCategories } from "@/toolkit/slices/categorySlice"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { CreateProductFormData, Product } from "@/types"
import useProductsState from "@/hooks/useProductsState"
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct
} from "@/toolkit/slices/productSlice"
import { uploadImageToCloudinary } from "@/utils/cloudinary"

export const AdminProductsManagement = () => {
  const { categories } = useCategoriesState()
  const { products, isLoading, error, totalPages } = useProductsState()

  const dispatch: AppDispatch = useDispatch()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors }
  } = useForm<CreateProductFormData>()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(3)
  const [isEdit, setIsEdit] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [selectedProductId, setSelectedProductId] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories({ pageNumber, pageSize }))
    }
    fetchData()
  }, [pageNumber])

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        fetchProducts({
          pageNumber,
          pageSize,
          selectedCategories: [],
          minPrice: undefined,
          maxPrice: undefined
        })
      )
    }
    fetchData()
  }, [pageNumber])

  const handlePrevPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }
  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const onSubmit: SubmitHandler<CreateProductFormData> = async (data) => {
    try {
      // upload image with cloudinary

      let imageUrl = " "
      if (data.image && data.image.length > 0) {
        const file = data.image[0]
        imageUrl = await uploadImageToCloudinary(file)
      }

      const productData = {
        ...data,
        image: imageUrl
      }

      console.log(productData)

      if (isEdit) {
        await dispatch(
          updateProduct({ updateProductData: productData, productId: selectedProductId })
        )
        setIsEdit(false)
      } else {
        await dispatch(createProduct(productData))
        // fetch product
        // await dispatch(fetchProducts({ pageNumber, pageSize }))
      }
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (product: Product) => {
    setIsEdit(true)

    setSelectedProductId(product.productId)
    setValue("name", product.name)
    setValue("description", product.description)
    setValue("price", product.price)
    setValue("quantity", product.quantity)
    // categories
    setValue("categoriesId", product.categoriesId)
    // setImagePreview(product.image)

    // image with if
    if (product.image) {
      setImagePreview(product.image)
    }
  }

  const handleDelete = async (productId: string) => {
    try {
      await dispatch(deleteProduct(productId))
    } catch (error) {
      console.log(error)
    }
  }

  const validatePositiveNumber = (value: string | number) => {
    const numericValue = parseFloat(value as string)
    if (isNaN(numericValue) || numericValue <= 0) {
      return "Price must be greater than zero"
    }
    return true
  }

  return (
    <div className="container flex-space-around">
      <AdminSidebar />
      <div className="main-container">
        {isLoading && <h2>Loading...</h2>}
        {error && <p>Error{error}</p>}

        <div className="card">
          <h2>{isEdit ? "Edit Product" : "Create Product"}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-field">
              <label htmlFor="image">Image:</label>
              <input
                type="file"
                accept="image/*"
                {...register("image", {
                  required: "image is required"
                })}
                onChange={handleImageChange}
              />
              {errors.image && <p>{errors.image.message}</p>}
              {imagePreview && <img src={imagePreview} alt="image preview" className="table-img" />}
            </div>
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
              <label htmlFor="name">Price:</label>
              <input
                type="number"
                step="0.01"
                {...register("price", {
                  required: "price is required",
                  validate: validatePositiveNumber
                })}
              />
              {errors.price && <p>{errors.price.message}</p>}
            </div>

            <div className="form-field">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                {...register("quantity", {
                  required: "quantity is required",
                  validate: validatePositiveNumber
                })}
              />
              {errors.quantity && <p>{errors.quantity.message}</p>}
            </div>

            {/* categories */}
            {/* Controler hook form */}
            <div className="form-field">
              <label htmlFor="categories">Categories: </label>
              <Controller
                name="categoriesId"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    onChange={(e) => {
                      const selectedValue = e.target.value
                      setValue("categoriesId", selectedValue)
                    }}
                  >
                    {categories.map((category) => (
                      <option key={category.categoryId} value={category.categoryId}>
                        {category.name} {/* Render category name here */}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            {/* 
            <div className="form-field">
              <label htmlFor="categories">Categories: </label>
              <select {...register("categoriesId")}>
                <option value="">Select Category</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category.categoryId} value={category.categoryId}>
                      {category.name}
                    </option>
                  ))}
              </select>
              {errors.categoriesId && <p>{errors.categoriesId.message}</p>}
            </div> */}

            <div className="form-field">
              <label htmlFor="description">Description: </label>
              <textarea id="" {...register("description")}></textarea>
            </div>

            <button type="submit" className="btn">
              {isEdit ? "Update Product" : "Create Product"}
            </button>
          </form>
        </div>
        <br />

        <h2>List of Products</h2>

        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Categories</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.length > 0 &&
              products.map((product) => (
                // <SingleCategory key={category.categoryId} category={category} />
                <tr key={product.productId}>
                  <td>
                    <img src={product.image} alt={product.name} className="table-img" />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category.name}</td>
                  <td>{product.description.substring(0, 100)}...</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => {
                        handleEdit(product)
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn delete-btn "
                      onClick={() => {
                        handleDelete(product.productId)
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
