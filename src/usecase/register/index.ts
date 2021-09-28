import { HttpRequest } from './HttpRequest'
import { Validation } from './Validation'
import { RegisterUserUsecase } from './Usecase'

export type { UsecaseError } from './Entity'
export { errorsTypes } from './Validation'

export const registerUseCaseFactory = () => {
  const validation = new Validation()
  const httpRequest = new HttpRequest()
  return new RegisterUserUsecase(
    validation,
    httpRequest
  )
}
