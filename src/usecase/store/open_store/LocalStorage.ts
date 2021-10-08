import * as AuthManager from '../../authentication/Usecase'

type StoreUpdate = {
  fantasyName: string
}

export const updateUserLocalStorage = (storeUpdate: StoreUpdate) => {
  const authData = AuthManager.get()
  authData.store = {
    fantasyName: storeUpdate.fantasyName
  }
  AuthManager.set(authData)
}
