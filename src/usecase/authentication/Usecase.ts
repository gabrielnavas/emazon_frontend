const LOCAL_STORAGE_USER_TOKEN = 'LOCAL_STORAGE_USER_TOKEN'

export type AuthData = {
  token: string,
  user: {
    fullName: string
    email: string
  },
  store?: {
    fantasyName: string
  }
}

export const set = (data: AuthData): void =>
  localStorage.setItem(LOCAL_STORAGE_USER_TOKEN, JSON.stringify(data))

export const get = (): AuthData | null =>
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_TOKEN))

export const logOut = (): void => localStorage.removeItem(LOCAL_STORAGE_USER_TOKEN)

export const isLogged = (): boolean => get() !== null

export const hasStore = (): boolean => get().store !== null
