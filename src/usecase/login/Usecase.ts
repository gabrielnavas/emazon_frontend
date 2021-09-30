import * as authenticatorUsecase from '../authentication/Usecase'
import { UsecaseError, User } from './Entity'
import { HttpRequest } from './HttpRequest'
import { errorsTypes, Validation } from './Validation'

type AuthenticatorSetter = (data: authenticatorUsecase.AuthData) => void

export class LoginUserUsecase {
  constructor (
    private readonly validate: Validation,
    private readonly httpRequest: HttpRequest,
    private readonly authenticatorSetter: AuthenticatorSetter
  ) {}

  handle = async (user: User): Promise<UsecaseError[]> => {
    const errors = this.validate.handle(user)
    if (errors.length > 0) {
      return errors
    }
    const response = await this.httpRequest.handle(user)
    if (response.statusCode === 201) {
      this.authenticatorSetter({
        token: response.data.token,
        user: {
          email: response.data.user.email,
          fullName: response.data.user.fullName
        }
      })
    } else if (response.statusCode === 404) {
      return [{
        fieldName: errorsTypes.GlobalError,
        message: 'Email/senha incorretos'
      }]
    }
    return []
  }
}
