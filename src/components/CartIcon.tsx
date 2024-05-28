import React from "react"
import { FaCartPlus } from "react-icons/fa"
const CartIcon = ({ value }: { value: number }) => {
  return (
    <div>
      <FaCartPlus />
      <span>{value}</span>
    </div>
  )
}

export default CartIcon
