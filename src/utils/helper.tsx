import { toast } from "react-toastify"

export const toastSuccess = (text: string) => {
  return toast.success(text)
}

export const toastError = (text: string) => {
  return toast.error(text)
}
