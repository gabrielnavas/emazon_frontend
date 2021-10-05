import { HttpRequest } from './HttpRequest'
import { GetBookUsecase } from './Usecase'

export const getBookUseCaseFactory = () => {
  const httpRequest = new HttpRequest()
  return new GetBookUsecase(httpRequest)
}
