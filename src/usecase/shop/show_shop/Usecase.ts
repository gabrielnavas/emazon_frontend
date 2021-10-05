import { makeEndpointAPI } from '../../../config/api'
import { Book } from './Entity'

export class ShowShopUsecase {
  private readonly BOOK_PEER_PAGE = 10

  constructor () {}

  getBooksPaginate = async (page: number): Promise<{
    books: Book[],
    limitPage: number
  }> => {
    if (String(page) === '-1') {
      return {
        books: [],
        limitPage: -1
      }
    }

    const pagePaginatePath = `shop/books/page?page=${page}&length_per_page=${this.BOOK_PEER_PAGE}`
    const response = await fetch(makeEndpointAPI(pagePaginatePath), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    const books = data.books
    const limitPage = Number(data.limit_page)

    const booksWithCamelCase = books.map(book => {
      // eslint-disable-next-line camelcase
      const { pages_amount, type_cover, published_at, publishing_company, ...rest } = book
      return {
        ...rest,
        pagesAmount: book.pages_amount,
        typeCover: {
          typeName: book.type_cover.type_name
        },
        publishedAt: book.published_at,
        publishingCompany: book.publishing_company
      }
    })
    return {
      books: booksWithCamelCase,
      limitPage
    }
  }

  getLimitePage = async (): Promise<{rangePages: number[]}> => {
    const limitPagePaths = `shop/books/pages_limit?length_per_page=${this.BOOK_PEER_PAGE}`

    const response = await fetch(makeEndpointAPI(limitPagePaths), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    const limitPage = Number(data.limit_page)

    const dontHaveBooks = limitPage === 0
    if (dontHaveBooks) {
      return {
        rangePages: []
      }
    }

    const rangePages = Array.from({ length: limitPage }, (_, i) => i + 1)
    return {
      rangePages
    }
  }
}
