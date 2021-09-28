import { HttpRequest } from './HttpRequest'
import { Validation } from './Validation'
import { LoginUserUsecase } from './Usecase'
import { TokenManager } from '../authentication/Usecase'

export type { UsecaseError } from './Entity'
export { errorsTypes } from './Validation'

export const loginUseCaseFactory = () => {
  const validation = new Validation()
  const httpRequest = new HttpRequest()
  const tokenManager = new TokenManager()
  return new LoginUserUsecase(
    validation,
    httpRequest,
    tokenManager
  )
}
