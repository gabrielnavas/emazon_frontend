import { makeEndpointAPI } from '../../../config/api'
import { OpenStoreFormData } from '../../../pages/store/open'

type OpenStoreHttpResponse = {
  error: string
  data?: {
    fantasyName: string
  }
}

const usecasesErrors = {
  ALREADY_EXISTS_STORE_FANTASY_NAME: 'já existe uma loja com esse nome fantasia',
  ALREADY_EXISTS_STORE_CNPJ: 'já existe uma loja com esse CNPJ',
  ALREADY_EXISTS_STORE_CPF: 'já existe uma loja com esse CPF',
  ALREADY_EXISTS_STORE_ACCOUNT: 'Você já tem uma loja aberta com essa conta'
}

const errorWrapper = (error: string): string =>
  Object.values(usecasesErrors).find(errorUsecase => errorUsecase === error)

export const openStoreHttpRequest =
  async (store: OpenStoreFormData, userToken: string): Promise<OpenStoreHttpResponse> => {
    const registerSlug = 'open_store'
    const urlPost = makeEndpointAPI(registerSlug)

    const payload = {
      fantasy_name: store.fantasyName,
      cnpj: store.toggleCpfCnpj === 'cnpj' ? store.cnpj : undefined,
      cpf: store.toggleCpfCnpj === 'cpf' ? store.cpf : undefined
    }
    const response = await fetch(urlPost, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify(payload)
    })
    const data = await response.json()

    if (response.status === 400) {
      const errorFound = errorWrapper(data.detail)
      if (errorFound) {
        return {
          error: data.detail
        }
      }
    }

    if (response.status === 201) {
      return {
        error: data.detail,
        data: {
          fantasyName: data.store.fantasy_name
        }
      }
    }

    return {
      error: 'server error'
    }
  }
