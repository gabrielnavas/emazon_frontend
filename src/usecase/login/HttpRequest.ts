import { makeEndpointAPI } from '../../config/api'
import { User } from './Entity'

type HttpResponse = {
  statusCode: number
  data?: {
    token: string,
    user: {
      fullName: string
      email: string
    },
    store?: {
      fantasyName: string
    }
  },
  errors: string[]
}

export class HttpRequest {
  private readonly urlPost: string
  constructor () {
    const loginSlug = 'login'
    this.urlPost = makeEndpointAPI(loginSlug)
  }

  handle = async (user: User): Promise<HttpResponse> => {
    const payload = {
      email: user.email,
      password: user.password
    }
    const response = await fetch(this.urlPost, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const data = await response.json()
    if (response.status === 201) {
      return {
        statusCode: response.status,
        data: {
          token: data.token,
          user: {
            fullName: data.user.full_name,
            email: data.user.email
          },
          store: data.store && {
            fantasyName: data.store.fantasy_name
          }
        },
        errors: []
      }
    }
    return {
      statusCode: response.status,
      errors: [data.detail]
    }
  }
}
