export type Book = {
  title: string
  typeCover: {
    typeName: string
  },
  publishedAt: Date,
  language: {
    name: string
  },
  author: {
    name: string
  },
  description: string,
  price: number,
  discount: number,
}
