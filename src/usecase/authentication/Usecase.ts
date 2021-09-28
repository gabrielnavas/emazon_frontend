const LOCAL_STORAGE_USER_TOKEN = 'LOCAL_STORAGE_USER_TOKEN'

export class TokenManager {
  set = (token: string) => {
    localStorage.setItem(LOCAL_STORAGE_USER_TOKEN, token)
  }

  get = (): string | null => {
    return localStorage.getItem(LOCAL_STORAGE_USER_TOKEN)
  }

  isLogged = () => this.get() !== null
}
