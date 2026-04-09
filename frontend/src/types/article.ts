import { CategoryType } from './category'

export type articleType = {
  id: string
  name: string
  brand: string
  price: number
  year: number | string
  image: string
  category: CategoryType
  amount: number
}
