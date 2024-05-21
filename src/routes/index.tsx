import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"
import {
  Contact,
  Error,
  Home,
  Register,
  Login,
  UserDashboard,
  AdminDashboard,
  UserProfile,
  UserOrder,
  Products,
  Categories,
  Orders,
  Users
} from "@/pages"
import { ProductDetails } from "@/pages/ProductDetails"

import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import AdminRoute from "./AdminRoute"

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

          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route path="user" element={<UserDashboard />} />
            <Route path="user/profile" element={<UserProfile />} />
            <Route path="user/orders" element={<UserOrder />} />
          </Route>

          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/orders" element={<Orders />} />
            <Route path="admin/users" element={<Users />} />
            <Route path="admin/categories" element={<Categories />} />
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}
