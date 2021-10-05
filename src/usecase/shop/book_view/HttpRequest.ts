import { makeEndpointAPI } from '../../../config/api'
import { Book } from './Entity'

type HttpResponseGetBook = {
  statusCode: number
  book?: Book
}

type HttpResponseGetBookIDs = {
  statusCode: number
  bookIDs: number[]
}

export class HttpRequest {
  private readonly urlPost: string
  constructor () {
    const registerSlug = 'register'
    this.urlPost = makeEndpointAPI(registerSlug)
  }

  getBook = async (bookID: number): Promise<HttpResponseGetBook> => {
    const response = await fetch(makeEndpointAPI(`shop/book/${bookID}`), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (response.status !== 200) {
      return {
        book: null,
        statusCode: response.status
      }
    }

    const data = await response.json()
    // eslint-disable-next-line camelcase
    const { pages_amount, type_cover, published_at, publishing_company, ...rest } = data.book
    const bookFixCamelCase = {
      ...rest,
      pagesAmount: data.book.pages_amount,
      typeCover: {
        typeName: data.book.type_cover.type_name
      },
      publishedAt: data.book.published_at,
      publishingCompany: data.book.publishing_company
    }

    return {
      book: bookFixCamelCase,
      statusCode: response.status
    }
  }

  getBookIDs = async (): Promise<HttpResponseGetBookIDs> => {
    const response = await fetch(makeEndpointAPI('shop/books/get_ids'), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (response.status !== 200) {
      return {
        bookIDs: [],
        statusCode: response.status
      }
    }

    const data = await response.json()
    const bookIDs = data.books_ids

    return {
      bookIDs,
      statusCode: response.status
    }
  }
}
