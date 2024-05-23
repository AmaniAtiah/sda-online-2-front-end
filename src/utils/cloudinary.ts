export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "vr4qlv4u")
  formData.append("cloud_name", "amani-atiah")
  formData.append("folder", "e-commerce")
  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/amani-atiah/image/upload`, {
      method: "POST",
      body: formData
    })
    if (!response.ok) {
      throw new Error("Failed to upload image")
    }
    const data = await response.json()
    return data.secure_url
  } catch (error) {
    console.error("error uploading image to Cloudinary", error)
    throw error
  }
}
