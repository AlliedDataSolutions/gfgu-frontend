export interface CategoryType {
  id: string
  name: string
  image: string
  description?: string
  type: string

}

export interface ImageType {
  id: string
  url: string
}

export interface ProductType {
  id: string
  name: string
  vendor: string
  price: number
  images: ImageType[]
  description: string
}

