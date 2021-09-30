const LOCAL_STORAGE_USER_TOKEN = 'LOCAL_STORAGE_USER_TOKEN'

type AuthData = {
  token: string,
  user: {
    fullName: string
    email: string
  }
}

export class AuthenticatorManager {
  set = (data: AuthData) => {
    localStorage.setItem(LOCAL_STORAGE_USER_TOKEN, JSON.stringify(data))
  }

  get = (): AuthData | null => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_TOKEN))
  }

  isLogged = () => this.get() !== null
}
