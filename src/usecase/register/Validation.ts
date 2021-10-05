import { RegisterFormData } from '../../pages/register'
import * as emailValidator from '../../utils/email'

export type Validation = (form: RegisterFormData) => RegisterFormData

export const validate: Validation = (form: RegisterFormData): RegisterFormData => {
  const errors = {} as RegisterFormData
  if (form.fullName.length <= 1 || form.fullName.length > 100) {
    errors.fullName = 'Nome deve ter entre 2 e 100 caracteres'
  }
  if (!emailValidator.validate(form.email)) {
    errors.email = 'Insira um email válido'
  }
  if (form.password.length < 6 || form.password.length > 100) {
    errors.password = 'Senha deve ter 6 e 100 caracteres'
  }
  if (form.passwordConfirmation.length < 6 || form.passwordConfirmation.length > 100) {
    errors.passwordConfirmation = 'Confirmação de Senha deve ter 6 e 100 caracteres'
  }
  if (form.password !== form.passwordConfirmation) {
    errors.password = 'Senha e confirmação de senha estão diferentes'
    errors.passwordConfirmation = 'Senha e confirmação de senha estão diferentes'
  }
  return errors
}
