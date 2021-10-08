import { makeEndpointAPI } from '../../../../config/api'
import { Language } from '../../../../pages/store/add_book'

type HttpResponse = {
  error: string
  data: Language[]
}

export const getLanguages = async (
  query: string,
  userToken: string
): Promise<HttpResponse> => {
  const slug = `book/language?language_query=${query}`
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
      data: data.languages
    }
  }

  return {
    error: 'server error',
    data: []
  }
}
