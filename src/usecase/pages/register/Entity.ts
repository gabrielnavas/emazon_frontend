export type User = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export type UsecaseError = {
  fieldName: string
  message: string
}
