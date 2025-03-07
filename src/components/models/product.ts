export interface ProductType {
    id: string
    name: string
    description: string
    price: number
    category: string
    image: string
    vendor: string
    inStock: boolean
    popular: boolean
  }
  
  export interface CategoryType {
    id: string
    name: string
    image: string
    description?: string
    type: string
  }