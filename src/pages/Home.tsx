import PageTitle from "@/components/PageTitle"
import Products from "@/components/Products"
import React from "react"

export const Home = () => {
  return (
    <div>
      <div className="main-container flex-space-around">
        <PageTitle title="Home" />
        <div className="hero">
          <p>
            We provide the finest coffee crops, committed to perfection, always striving for
            excellence and uniqueness, keeping in mind the achievement of our customers’ desires and
            goals by roasting coffee to high standards so that every customer has an unforgettable
            coffee experience.
          </p>
          <a href="#" className="button__hero">
            Learn More
          </a>
        </div>
        {/* <div className="sidebar-container">
          <ProductSidebar />
        </div> */}
        {/* <div className="main-container"> */}

        <Products />
        {/* </div> */}
      </div>
    </div>
  )
}
