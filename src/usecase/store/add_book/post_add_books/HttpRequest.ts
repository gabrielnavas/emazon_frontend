import { makeEndpointAPI } from '../../../../config/api'
import { BookFormData } from '../../../../pages/store/add_book'

type HttpResponse = {
  error?: string
  data?: {
    book: {
      id: number
    }
  }
}

const usecasesErrors = {
  ALREADY_EXISTS_BOOK_TITLE: 'Já existe um livro com esse título'
}

const errorWrapper = (error: string): string =>
  Object.values(usecasesErrors).find(errorUsecase => errorUsecase === error)

export const addBookHttpRequest =
  async (book: BookFormData, userToken: string): Promise<HttpResponse> => {
    const slug = 'book'
    const urlPost = makeEndpointAPI(slug)
    console.log(book)

    const payload = {
      title: book.title,
      published_at: book.publishedAt,
      description: book.description,
      price: book.price,
      discount: book.discount,
      pages_amount: book.pagesAmount,
      heigh: book.heigh,
      width: book.width,
      thickness: book.thickness,
      author_id: book.authorID,
      type_cover_id: book.typeCoverID,
      language_id: book.languageID,
      category_id: book.categoryID,
      publishing_company_id: book.publishingCompanyID
    }
    const response = await fetch(urlPost, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify(payload)
    })
    const data = await response.json()

    if (response.status === 400) {
      const errorFound = errorWrapper(data.detail)
      if (errorFound) {
        return {
          error: errorFound
        }
      }
    }

    if (response.status === 201) {
      return {
        data: {
          book: {
            id: data.book.id
          }
        }
      }
    }

    return {
      error: 'server error'
    }
  }
