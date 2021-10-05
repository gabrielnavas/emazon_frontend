import { makeEndpointAPI } from '../../config/api'
import { RegisterFormData } from '../../pages/register'

type HttpResponseRegister = {
  statusCode: number
}

export type HttpRequestRegister = (registerFormData: RegisterFormData) => Promise<HttpResponseRegister>

export const httpRequestRegister = async (registerFormData: RegisterFormData): Promise<HttpResponseRegister> => {
  const registerSlug = 'register'
  const urlPost = makeEndpointAPI(registerSlug)

  const payload = {
    full_name: registerFormData.fullName,
    email: registerFormData.email,
    password: registerFormData.password,
    password_confirmation: registerFormData.passwordConfirmation
  }
  const response = await fetch(urlPost, {
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
