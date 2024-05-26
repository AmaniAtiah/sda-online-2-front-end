import React, { useEffect, useState } from "react"
import SingleProduct from "./SingleProduct"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/toolkit/store"
import { fetchProducts } from "@/toolkit/slices/productSlice"
import useProductsState from "@/hooks/useProductsState"
import { TextField, Select, MenuItem, Button, InputAdornment, withStyles } from "@mui/material"
import { SelectChangeEvent } from "@mui/material/Select"
import SearchIcon from "@mui/icons-material/Search"
import useCategoriesState from "@/hooks/useCategoriesState"
import { fetchCategories } from "@/toolkit/slices/categorySlice"

import ProductSidebar from "./layout/sidebars/ProductSidebar"

const Products = () => {
  const { products, isLoading, error, totalPages } = useProductsState()
  const dispatch: AppDispatch = useDispatch()
  const { categories } = useCategoriesState()

  const [pageNumber, setPageNumber] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [pageSize] = useState(6)
  const [sortBy, setSortBy] = useState("price")
  const [sortDirection, setSortDirection] = useState("asc")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [minPrice, setMinprice] = useState<number | undefined>(undefined)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        fetchProducts({
          pageNumber,
          pageSize,
          searchTerm,
          sortBy,
          sortDirection,
          selectedCategories,
          minPrice,
          maxPrice
        })
      )
    }
    fetchData()
  }, [pageNumber, searchTerm, sortBy, sortDirection, selectedCategories, minPrice, maxPrice])

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories({ pageNumber, pageSize }))
    }
    fetchData()
  }, [])

  const handlePrevPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }

  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSortChange = (e: SelectChangeEvent<any>) => {
    const { name, value } = e.target
    if (name === "sortBy") {
      setSortBy(value)
    } else if (name === "sortDirection") {
      setSortDirection(value)
    }
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    )
  }

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinprice(Number(e.target.value))
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(e.target.value))
  }

  return (
    <div className="flex flex-wrap">
      <ProductSidebar
        categories={categories}
        selectedCategories={selectedCategories}
        handleCategoryChange={handleCategoryChange}
        handleMinPriceChange={handleMinPriceChange}
        handleMaxPriceChange={handleMaxPriceChange}
      />

      <div className="w-full md:w-3/4 p-4">
        {isLoading && <h2 className="text-red-500">Loading...</h2>}
        {error && <p className="text-red-500">Error: {error}</p>}

        <div className="flex flex-col md:flex-row items-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
          <TextField
            type="text"
            placeholder="Search Products"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full md:w-1/3 p-2 rounded border border-gray-300 focus:outline-none"
            InputLabelProps={{
              className: "customInputLabel" // Apply custom styles to the input label
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: { color: "black", borderColor: "black" }, // Set the text and border color
              classes: {
                focused: "focusedInput" // Apply the focusedInput class when TextField is focused
              }
            }}
          />
          <Select
            value={sortBy}
            onChange={handleSortChange}
            name="sortBy"
            className="w-full md:w-1/6 border border-gray-300 focus:outline-none"
          >
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="name">Name</MenuItem>
          </Select>
          <Select
            value={sortDirection}
            onChange={handleSortChange}
            name="sortDirection"
            className="w-full md:w-1/6 border border-gray-300 focus:outline-none"
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </div>

        <h2 className="text-lg font-semibold mb-4">List of Products</h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products &&
            products.map((product) => <SingleProduct key={product.productId} product={product} />)}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={pageNumber === 1}
            className="btn btn-primary mr-2"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              onClick={() => setPageNumber(index + 1)}
              className="btn btn-primary mr-2"
            >
              {index + 1}
            </Button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={pageNumber === totalPages}
            className="btn btn-primary"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Products
