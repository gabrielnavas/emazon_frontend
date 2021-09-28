import { UsecaseError, User } from './Entity'
import * as emailValidator from '../../utils/email'

export const errorsTypes = {
  GlobalError: 'globalFormError',
  EmailError: 'email',
  PasswordError: 'password'
}

export class Validation {
  handle = (user: User) => {
    const errors = [] as UsecaseError[]
    if (!emailValidator.validate(user.email)) {
      errors.push({ fieldName: errorsTypes.EmailError, message: 'Email inválido' })
    }
    if (user.password.length < 6 || user.password.length > 100) {
      errors.push({ fieldName: errorsTypes.PasswordError, message: 'Senha deve ter 6 e 100 caracteres' })
    }
    return errors
  }
}
