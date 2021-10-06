import { CpfOrCnpjType } from '../../pages/store/open'

const mask = (cpfOrCnpj: string, type: CpfOrCnpjType) => {
  let newStr = cpfOrCnpj.split('').join('')
  newStr = newStr.replace(/\D/g, '')
  if (type === 'cpf') {
    newStr = newStr.replace(/(\d{3})(\d)/, '$1.$2')
    newStr = newStr.replace(/(\d{3})(\d)/, '$1.$2')
    newStr = newStr.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }
  if (type === 'cnpj') {
    newStr = newStr.replace(/^(\d{2})(\d)/, '$1.$2')
    newStr = newStr.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    newStr = newStr.replace(/\.(\d{3})(\d)/, '.$1/$2')
    newStr = newStr.replace(/(\d{4})(\d)/, '$1-$2')
  }
  return newStr
}

export const formatCpfCnpj = (e, formikHandleChange, type: CpfOrCnpjType) => {
  e.target.value = e.target.value.replace(/\D/g, '')
  if (type === 'cpf' && e.target.value.length <= 11) {
    e.target.value = mask(e.target.value, type)
    formikHandleChange(e)
  }
  if (type === 'cnpj' && e.target.value.length <= 14) {
    e.target.value = mask(e.target.value, type)
    formikHandleChange(e)
  }
}
