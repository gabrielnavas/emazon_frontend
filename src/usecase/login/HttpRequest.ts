import { makeEndpointAPI } from '../../config/api'
import { LoginFormData } from '../../pages/login'

type LoginHttpResponse = {
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
}
export type LoginHttpRequest = (loginForm: LoginFormData) => Promise<LoginHttpResponse>

export const loginHttpRequest: LoginHttpRequest =
  async (loginForm: LoginFormData): Promise<LoginHttpResponse> => {
    const loginSlug = 'login'
    const urlPost = makeEndpointAPI(loginSlug)

    const payload = {
      email: loginForm.email,
      password: loginForm.password
    }
    const response = await fetch(urlPost, {
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
        }
      }
    }
    return {
      statusCode: response.status
    }
  }
