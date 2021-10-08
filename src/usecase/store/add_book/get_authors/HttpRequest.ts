import { makeEndpointAPI } from '../../../../config/api'
import { Author } from '../../../../pages/store/add_book'

type HttpResponse = {
  error: string
  data: Author[]
}

export const getAuthors = async (
  query: string,
  userToken: string
): Promise<HttpResponse> => {
  const slug = `book/authors?author_name=${query}`
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
      data: data.authors
    }
  }

  return {
    error: 'server error',
    data: []
  }
}
