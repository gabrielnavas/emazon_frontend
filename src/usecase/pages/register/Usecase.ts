import { UsecaseError, User } from './Entity'
import { HttpRequest } from './HttpRequest'
import { Validation } from './Validation'

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
    await this.httpRequest.handle(user)
    return []
  }
}
