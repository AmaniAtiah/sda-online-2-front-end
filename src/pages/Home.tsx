import PageTitle from "@/components/PageTitle"
import Products from "@/components/Products"
import ProductSidebar from "@/components/layout/sidebars/ProductSidebar"
import React from "react"

export const Home = () => {
  return (
    <div>
      <div className="container flex-space-around">
        <PageTitle title="Home" />
        <div className="sidebar-container">
          <ProductSidebar />
        </div>
        <div className="main-container">
          <Products />
        </div>
      </div>
    </div>
  )
}
