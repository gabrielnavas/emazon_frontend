import { makeEndpointAPI } from '../../config/api'
import { User } from './Entity'

type HttpResponse = {
  statusCode: number
}

export class HttpRequest {
  private readonly urlPost: string
  constructor () {
    const registerSlug = 'users'
    this.urlPost = makeEndpointAPI(registerSlug)
  }

  handle = async (user: User): Promise<HttpResponse> => {
    const payload = {
      full_name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.passwordConfirmation
    }
    const response = await fetch(this.urlPost, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    return {
      statusCode: response.status
    }
  }
}
