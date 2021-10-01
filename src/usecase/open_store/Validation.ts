import { UsecaseError, Store } from './Entity'

export const errorsTypes = {
  GlobalError: 'globalFormError',
  fantasyNameError: 'fantasy_name',
  cnpjError: 'cnpj',
  cpfError: 'cpf'
}

export class Validation {
  handle = (user: Store) => {
    const errors = [] as UsecaseError[]
    if (user.fantasyName.length <= 1 || user.fantasyName.length > 100) {
      errors.push({ fieldName: errorsTypes.fantasyNameError, message: 'Nome fantasia deve ter entre 2 e 100 caracteres' })
    }
    if (user.cnpj.length !== 11) {
      errors.push({ fieldName: errorsTypes.cnpjError, message: 'cpf deve 11 caracteres' })
    }
    if (user.cpf.length !== 14) {
      errors.push({
        fieldName: errorsTypes.cpfError,
        message: 'CNPJ deve ter 14 caracteres'
      })
    }
    return errors
  }
}
