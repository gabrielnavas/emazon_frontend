import { HttpRequest } from './HttpRequest'
import { Validation } from './Validation'
import { OpenStoreUserUsecase } from './Usecase'

export type { UsecaseError } from './Entity'
export { errorsTypes } from './Validation'

export const openStoreUseCaseFactory = () => {
  const validation = new Validation()
  const httpRequest = new HttpRequest()
  return new OpenStoreUserUsecase(
    validation,
    httpRequest
  )
}
