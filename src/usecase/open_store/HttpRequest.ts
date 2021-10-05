import { makeEndpointAPI } from '../../config/api'
import { Store } from './Entity'

type HttpResponse = {
  statusCode: number
  error: string
  data?: {
    fantasyName: string
  }
}

export class HttpRequest {
  private readonly urlPost: string
  constructor () {
    const registerSlug = 'open_store'
    this.urlPost = makeEndpointAPI(registerSlug)
  }

  handle = async (store: Store, userToken: string): Promise<HttpResponse> => {
    const payload = {
      fantasy_name: store.fantasyName,
      cnpj: store.cnpj,
      cpf: store.cpf
    }
    const response = await fetch(this.urlPost, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify(payload)
    })
    const data = await response.json()

    if (response.status !== 201) {
      return {
        statusCode: response.status,
        error: data.detail
      }
    }
    return {
      statusCode: response.status,
      error: data.detail,
      data: {
        fantasyName: data.store.fantasy_name
      }
    }
  }
}
