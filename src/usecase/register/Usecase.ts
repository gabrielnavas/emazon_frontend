import { UsecaseError, User } from './Entity'
import { HttpRequest } from './HttpRequest'
import { errorsTypes, Validation } from './Validation'

export class RegisterUserUsecase {
  constructor (
    private readonly validate: Validation,
    private readonly httpRequest: HttpRequest
  ) {}

  handle = async (user: User): Promise<UsecaseError[]> => {
    const errors = this.validate.handle(user)
    if (errors.length > 0) {
      return errors
    }
    const response = await this.httpRequest.handle(user)
    if (response.statusCode === 400) {
      return [{
        fieldName: errorsTypes.EmailError,
        message: 'Usuário já existe com esse email'
      }]
    }
    return []
  }
}
