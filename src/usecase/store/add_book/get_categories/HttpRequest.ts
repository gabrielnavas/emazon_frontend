import { makeEndpointAPI } from '../../../../config/api'
import { Category } from '../../../../pages/store/add_book'

type HttpResponse = {
  error: string
  data: Category[]
}

export const getCategories = async (
  query: string,
  userToken: string
): Promise<HttpResponse> => {
  const slug = `book/category?category_query=${query}`
  const urlPost = makeEndpointAPI(slug)

  const response = await fetch(urlPost, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`
    }
  })
  const data = await response.json()

  if (response.status === 200) {
    return {
      error: data.detail,
      data: data.categories
    }
  }

  return {
    error: 'server error',
    data: []
  }
}
