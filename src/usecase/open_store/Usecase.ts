import * as AuthData from '../authentication/Usecase'
import { UsecaseError, Store } from './Entity'
import { HttpRequest } from './HttpRequest'
import { errorsTypes, Validation } from './Validation'

const usecasesErrors = {
  ALREADY_EXISTS_STORE_FANTASY_NAME: 'já existe uma loja com esse nome fantasia',
  ALREADY_EXISTS_STORE_CNPJ: 'já existe uma loja com esse CNPJ',
  ALREADY_EXISTS_STORE_CPF: 'já existe uma loja com esse CPF',
  ALREADY_EXISTS_STORE_ACCOUNT: 'Você já tem uma loja aberta com essa conta'
}

// cpf
// 060.874.300-32

// cnpj
// 17.554.462/0001-53

export class OpenStoreUserUsecase {
  constructor (
    private readonly validate: Validation,
    private readonly httpRequest: HttpRequest
  ) {}

  handle = async (store: Store, userToken: string): Promise<UsecaseError[]> => {
    const errors = this.validate.handle(store)
    if (errors.length > 0) {
      return errors
    }
    const response = await this.httpRequest.handle(store, userToken)
    if (response.statusCode === 400) {
      const errorFound = Object.values(usecasesErrors).find(errorUsecase => errorUsecase === response.error)
      console.log(errorFound)
      if (errorFound) {
        return [{
          fieldName: errorsTypes.GlobalError,
          message: errorFound
        }]
      }
    } else if (response.statusCode === 201) {
      const authData = AuthData.get()
      authData.store = {
        fantasyName: response.data.fantasyName
      }
      AuthData.set(authData)
    }
    return []
  }
}
