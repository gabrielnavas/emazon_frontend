import { makeEndpointAPI } from '../../../../config/api'
import { TypeCover } from '../../../../pages/store/add_book'

type GetAuthorsHttpResponse = {
  error: string
  data: TypeCover[]
}

export const getTypeCovers = async (
  query: string,
  userToken: string
): Promise<GetAuthorsHttpResponse> => {
  const slug = `book/type_cover?type_cover_name=${query}`
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
      data: data.type_covers.map(obj => ({ ...obj, name: obj.type_name }))
    }
  }

  return {
    error: 'server error',
    data: []
  }
}
