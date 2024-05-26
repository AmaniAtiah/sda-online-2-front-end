import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Grid from "@mui/material/Grid"
import useCategoriesState from "@/hooks/useCategoriesState"
import { fetchCategories } from "@/toolkit/slices/categorySlice"
import { AppDispatch } from "@/toolkit/store"
import { select } from "@material-tailwind/react"
import { Checkbox, InputAdornment, TextField } from "@mui/material"
import { Category } from "@/types"

type SidebarProps = {
  categories: Category[]
  selectedCategories: string[]
  handleCategoryChange: (id: string) => void
  handleMinPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ProductSidebar = (props: SidebarProps) => {
  //   const { categories } = useCategoriesState()

  return (
    <div className="p-4 w-full md:w-1/4">
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Filter by Category</h3>
            {props.categories.map((category) => (
              <div key={category.categoryId} className="flex items-center">
                <Checkbox
                  sx={{
                    color: "black",
                    "&.Mui-checked": {
                      color: "black"
                    }
                  }}
                  checked={props.selectedCategories.includes(category.categoryId)}
                  onChange={() => props.handleCategoryChange(category.categoryId)}
                />
                <span className="ml-2">{category.name}</span>
              </div>
            ))}
          </div>
        </Grid>
        <Grid item>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Filter by Price</h3>
            <div className="mb-4">
              <TextField
                type="number"
                name="min-price"
                label="Min Price"
                onChange={props.handleMinPriceChange}
                className="w-full"
                InputLabelProps={{
                  className: "customInputLabel" // Apply custom styles to the input label
                }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  style: { color: "black", borderColor: "black" }, // Set the text and border color
                  classes: {
                    focused: "focusedInput" // Apply the focusedInput class when TextField is focused
                  }
                }}
              />
            </div>
            <div>
              <TextField
                type="number"
                name="max-price"
                label="Max Price"
                onChange={props.handleMaxPriceChange}
                className="w-full"
                InputLabelProps={{
                  className: "customInputLabel" // Apply custom styles to the input label
                }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  style: { color: "black", borderColor: "black" }, // Set the text and border color
                  classes: {
                    focused: "focusedInput" // Apply the focusedInput class when TextField is focused
                  }
                }}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default ProductSidebar
