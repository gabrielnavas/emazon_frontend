import { makeEndpointAPI } from '../../config/api'
import { Store } from './Entity'

type HttpResponse = {
  statusCode: number
  error: string
}

export class HttpRequest {
  private readonly urlPost: string
  constructor () {
    const registerSlug = 'open_store'
    this.urlPost = makeEndpointAPI(registerSlug)
  }

  handle = async (store: Store): Promise<HttpResponse> => {
    const payload = {
      fantasy_name: store.fantasyName,
      cnpj: store.cnpj,
      cpf: store.cpf
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
      error: data.detail
    }
  }
}
