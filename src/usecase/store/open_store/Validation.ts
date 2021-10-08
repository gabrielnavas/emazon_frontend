import { OpenStoreFormData } from '../../../pages/store/open'
import { validateCnpj, validateCpf } from '../../../utils/validate/brasil'

type Validation = (openStore: OpenStoreFormData) => OpenStoreFormData

export const validate: Validation =
  (openStore: OpenStoreFormData): OpenStoreFormData => {
    const errors = {} as OpenStoreFormData
    if (openStore.fantasyName.length <= 1 || openStore.fantasyName.length > 100) {
      errors.fantasyName = 'Nome fantasia deve ter entre 2 e 100 caracteres'
    }
    if (openStore.cpf && !validateCpf(openStore.cpf)) {
      errors.cpf = 'CPF inválido'
    }
    if (openStore.cnpj && !validateCnpj(openStore.cnpj)) {
      errors.cnpj = 'CNPJ inválido'
    }
    return errors
  }
