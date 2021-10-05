import { validateCnpj, validateCpf } from '../../utils/validate/brasil'
import { UsecaseError, Store } from './Entity'

export const errorsTypes = {
  GlobalError: 'globalFormError',
  fantasyNameError: 'fantasy_name',
  cnpjError: 'cnpj',
  cpfError: 'cpf'
}

export class Validation {
  handle = (store: Store) => {
    const errors = [] as UsecaseError[]
    if (store.fantasyName.length <= 1 || store.fantasyName.length > 100) {
      errors.push({ fieldName: errorsTypes.fantasyNameError, message: 'Nome fantasia deve ter entre 2 e 100 caracteres' })
    }
    if (store.cpf && !validateCpf(store.cpf)) {
      errors.push({ fieldName: errorsTypes.cpfError, message: 'CPF inválido' })
    }
    if (store.cnpj && !validateCnpj(store.cnpj)) {
      errors.push({
        fieldName: errorsTypes.cnpjError,
        message: 'CNPJ inválido'
      })
    }
    return errors
  }
}
