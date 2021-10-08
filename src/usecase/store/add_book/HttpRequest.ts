import { makeEndpointAPI } from '../../../config/api'
import { BookData } from '../../../pages/store/add_book'

type HttpResponse = {
  error: string
}

const usecasesErrors = {
  ALREADY_EXISTS_BOOK_TITLE: 'Já existe um livro com esse título'
}

const errorWrapper = (error: string): string =>
  Object.values(usecasesErrors).find(errorUsecase => errorUsecase === error)

export const addBookHttpRequest =
  async (book: BookData, userToken: string): Promise<HttpResponse> => {
    const registerSlug = 'open_store'
    const urlPost = makeEndpointAPI(registerSlug)

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
      publishing_company_id: book.publishingCompanyID,
      store_id: book.storyID
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
          error: data.detail
        }
      }
    }

    if (response.status === 201) {
      return {
        error: data.detail
      }
    }

    return {
      error: 'server error'
    }
  }
