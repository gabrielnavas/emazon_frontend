import { AuthenticatorManager } from '../authentication/Usecase'
import { UsecaseError, User } from './Entity'
import { HttpRequest } from './HttpRequest'
import { errorsTypes, Validation } from './Validation'

export class LoginUserUsecase {
  constructor (
    private readonly validate: Validation,
    private readonly httpRequest: HttpRequest,
    private readonly authenticatorManager: AuthenticatorManager
  ) {}

  handle = async (user: User): Promise<UsecaseError[]> => {
    const errors = this.validate.handle(user)
    if (errors.length > 0) {
      return errors
    }
    const response = await this.httpRequest.handle(user)
    if (response.statusCode === 201) {
      this.authenticatorManager.set({
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
