import React from "react"
import { Category } from "@/types"

type SidebarProps = {
  categories: Category[]
  selectedCategories: string[]
  handleCategoryChange: (id: string) => void
  handleMinPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ProductSidebar = (props: SidebarProps) => {
  return (
    <div className="p-4 w-full md:w-1/4">
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Filter by Category</h3>
        {props.categories.map((category) => (
          <div key={category.categoryId} className="flex items-center">
            <input
              type="checkbox"
              className="color__box"
              checked={props.selectedCategories.includes(category.categoryId)}
              onChange={() => props.handleCategoryChange(category.categoryId)}
            />
            <span className="ml-2">{category.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Filter by Price</h3>
        <div className="mb-4">
          <input
            type="number"
            name="min-price"
            placeholder="Min Price"
            onChange={props.handleMinPriceChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none"
          />
        </div>
        <div>
          <input
            type="number"
            name="max-price"
            placeholder="Max Price"
            onChange={props.handleMaxPriceChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}

export default ProductSidebar
