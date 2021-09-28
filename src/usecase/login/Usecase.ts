import { TokenManager } from '../authentication/Usecase'
import { UsecaseError, User } from './Entity'
import { HttpRequest } from './HttpRequest'
import { Validation } from './Validation'

export class LoginUserUsecase {
  constructor (
    private readonly validate: Validation,
    private readonly httpRequest: HttpRequest,
    private readonly tokenManager: TokenManager
  ) {}

  handle = async (user: User): Promise<UsecaseError[]> => {
    const errors = this.validate.handle(user)
    if (errors.length > 0) {
      return errors
    }
    const response = await this.httpRequest.handle(user)
    if (response.statusCode === 201) {
      this.tokenManager.set(response.data.token)
    }
    return []
  }
}
