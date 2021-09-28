import * as emailValidator from '../../utils/email'
import { UsecaseError, User } from './Entity'

export const errorsTypes = {
  GlobalError: 'globalFormError',
  NameError: 'name',
  EmailError: 'email',
  PasswordError: 'password',
  PasswordConfirmationError: 'passwordConfirmation'
}

export class Validation {
  handle = (user: User) => {
    const errors = [] as UsecaseError[]
    if (user.name.length <= 1 || user.name.length > 100) {
      errors.push({ fieldName: errorsTypes.NameError, message: 'Nome deve ter entre 2 e 100 caracteres' })
    }
    if (!emailValidator.validate(user.email)) {
      errors.push({ fieldName: errorsTypes.EmailError, message: 'Email inválido' })
    }
    if (user.password.length < 6 || user.password.length > 100) {
      errors.push({ fieldName: errorsTypes.PasswordError, message: 'Senha deve ter 6 e 100 caracteres' })
    }
    if (user.passwordConfirmation.length < 6 || user.passwordConfirmation.length > 100) {
      errors.push({
        fieldName: errorsTypes.PasswordConfirmationError,
        message: 'Confirmação de Senha deve ter 6 e 100 caracteres'
      })
    }
    if (user.password !== user.passwordConfirmation) {
      errors.push({
        fieldName: errorsTypes.GlobalError,
        message: 'Verificar senha e confirmacao de senha'
      })
    }
    return errors
  }
}
