import { validateBr } from 'js-brasil'

export const validateCpf = (cpf: string) => validateBr.cpf(cpf)
export const validateCnpj = (cnpj: string) => validateBr.cnpj(cnpj)
