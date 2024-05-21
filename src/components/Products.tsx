import React, { useEffect, useState } from "react"
import SingleProduct from "./SingleProduct"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/toolkit/store"
import { fetchProducts } from "@/toolkit/slices/productSlice"
import { Button } from "./ui/button"
import useProductsState from "@/hooks/useProductsState"

const Products = () => {
  // const { products, isLoading, error, totalPages } = useSelector(
  //   (state: RootState) => state.productR
  // )

  const { products, isLoading, error, totalPages } = useProductsState()

  const dispatch: AppDispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(3)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("price")
  const [sortDirection, setSortDirection] = useState("asc")

  //   console.log(products)
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts({ pageNumber, pageSize, searchTerm, sortBy, sortDirection }))
    }
    fetchData()
  }, [pageNumber, searchTerm, sortBy, sortDirection])

  const handlePrevPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }
  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === "sortBy") {
      setSortBy(value)
    } else if (name === "sortDirection") {
      setSortDirection(value)
    }
  }

  return (
    <div>
      {isLoading && <h2>Loading...</h2>}
      {error && <p>Error{error}</p>}

      <div className="action flex-center">
        <div>
          <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex-center">
          <p>Sort by</p>
          <select name="" id="" onChange={handleSortChange}>
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>

          <select name="sortDirection" onChange={handleSortChange} value={sortDirection}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <h2>List of Products</h2>

      <section className="products">
        {products &&
          products.length > 0 &&
          products.map((product) => <SingleProduct key={product.productId} product={product} />)}
      </section>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={pageNumber === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button key={index} onClick={() => setPageNumber(index + 1)}>
            {index + 1}
          </Button>
        ))}
        <button onClick={handleNextPage} disabled={pageNumber === totalPages}>
          Next
        </button>
      </div>
    </div>
  )
}

export default Products
