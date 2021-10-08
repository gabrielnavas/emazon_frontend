import { makeEndpointAPI } from '../../../../config/api'
import { PublishingCompany } from '../../../../pages/store/add_book'

type HttpResponse = {
  error: string
  data: PublishingCompany[]
}

export const getPublishingCompany = async (
  query: string,
  userToken: string
): Promise<HttpResponse> => {
  const slug = `book/publishing_company?publishing_company_query=${query}`
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
      data: data.publishing_companies
    }
  }

  return {
    error: 'server error',
    data: []
  }
}
