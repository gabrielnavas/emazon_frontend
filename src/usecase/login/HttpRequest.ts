import { makeEndpointAPI } from '../../config/api'
import { User } from './Entity'

type HttpResponse = {
  statusCode: number
  data: {
    token: string
  }
}

export class HttpRequest {
  private readonly urlPost: string
  constructor () {
    const loginSlug = 'users/token'
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
    return {
      statusCode: response.status,
      data: {
        token: data.token
      }
    }
  }
}
