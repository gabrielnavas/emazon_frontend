import { makeEndpointAPI } from '../../../config/api'
import { User } from './Entity'

export class HttpRequest {
  private readonly urlPost: string
  constructor () {
    const registerSlug = 'register_user'
    this.urlPost = makeEndpointAPI(registerSlug)
  }

  handle = async (user: User): Promise<void> => {
    const nameSplited = user.name.split(' ')
    const payload = {
      first_name: nameSplited[0],
      last_name: nameSplited.length > 0 ? nameSplited[1] : undefined,
      email: user.email,
      password: user.password,
      passsword_confirmation: user.passwordConfirmation
    }
    await fetch(this.urlPost, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
  }
}
