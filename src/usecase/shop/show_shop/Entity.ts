export type Book = {
  id: number
  title: string
  price: number
  discount: number
  description: string
  pagesAmount: number
  heigh: number,
  width: number,
  thickness: number,
  publishedAt: Date,
  publishingCompany: {
    name: string
  },
  author: {
      name: string
  },
  typeCover: {
      typeName: string
  },
  language: {
      code: string
      name: string
  },
  category: {
      name: string
  }
}
