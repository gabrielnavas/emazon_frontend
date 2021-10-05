import { LoginFormData } from '../../pages/login'
import * as emailValidator from '../../utils/email'

type Validation = (form: LoginFormData) => LoginFormData

export const validate: Validation = (form: LoginFormData): LoginFormData => {
  const errors = {} as LoginFormData
  if (!emailValidator.validate(form.email)) {
    errors.email = 'Email inválido'
  }
  if (form.password.length < 6 || form.password.length > 100) {
    errors.password = 'Senha deve ter 6 e 100 caracteres'
  }
  return errors
}
