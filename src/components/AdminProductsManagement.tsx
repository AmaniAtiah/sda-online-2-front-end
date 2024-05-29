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
    <div className="container main-container mx-auto flex">
      <AdminSidebar />
      <div className="flex-grow">
        {isLoading && <h2>Loading...</h2>}
        {error && <p>Error: {error}</p>}

        <div className="card p-4">
          <h2 className="text-xl font-bold mb-4">{isEdit ? "Edit Product" : "Create Product"}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-field mb-4">
              <div className="form-group mb-4">
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
                {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
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

              <div className="form-field mb-4">
                <label htmlFor="price" className="block mb-2">
                  Price:
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("price", {
                    required: "Price is required",
                    validate: validatePositiveNumber
                  })}
                  className="border border-gray-300 rounded px-3 py-2 "
                />
                {errors.price && <p className="text-red-500 mt-1">{errors.price.message}</p>}
              </div>

              <div className="form-field mb-4">
                <label htmlFor="quantity" className="block mb-2">
                  Quantity:
                </label>
                <input
                  type="number"
                  {...register("quantity", {
                    required: "Quantity is required",
                    validate: validatePositiveNumber
                  })}
                  className="border border-gray-300 rounded px-3 py-2"
                />
                {errors.quantity && <p className="text-red-500 mt-1">{errors.quantity.message}</p>}
              </div>

              <div className="form-field mb-4">
                <label htmlFor="image" className="block mb-2">
                  Image:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("image", {
                    required: "Image is required"
                  })}
                  onChange={handleImageChange}
                  className="border border-gray-300 rounded px-3 py-2"
                />
                {errors.image && <p className="text-red-500 mt-1">{errors.image.message}</p>}
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="mt-4 image__preview" />
                )}
              </div>

              <div className="form-field mb-4">
                <label htmlFor="categories" className="block mb-2">
                  Categories:
                </label>
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
                      className="border border-gray-300 rounded px-3 py-2"
                    >
                      {categories.map((category) => (
                        <option key={category.categoryId} value={category.categoryId}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>

              <button type="submit" className="button__add  py-2 px-4 rounded">
                {isEdit ? "Update Product" : "Create Product"}
              </button>
            </div>
          </form>
        </div>
        <br />

        <h2 className="title">List of Products</h2>

        <table className="product-table w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Categories</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.length > 0 &&
              products.map((product) => (
                <tr key={product.productId} className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">
                    <img src={product.image} alt={product.name} className="image__preview" />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.category.name}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.description.substring(0, 100)}...
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="button__edit  py-1 px-2 rounded  mr-2"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="button__delete  py-1 px-2 rounded  mr-2"
                      onClick={() => handleDelete(product.productId)}
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
            className="btn bg-gray-300 text-gray-600 px-4 py-2 mr-2"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setPageNumber(index + 1)}
              className="btn bg-gray-300 text-gray-600 px-4 py-2 mr-2"
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={pageNumber === totalPages}
            className="btn bg-gray-300 text-gray-600 px-4 py-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
