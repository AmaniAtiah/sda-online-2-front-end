import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"
import { Contact, Error, Home, Register, Login } from "@/pages"
import { ProductDetails } from "@/pages/ProductDetails"
import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}
