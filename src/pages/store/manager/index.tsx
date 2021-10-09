import { useEffect } from 'react'
import Router from 'next/router'

import Header from '../../../components/Header'

import {
  getLoginPath,
  getOpenStoreInitital
} from '../../../config/routesPath'
import * as AuthenticationManager from '../../../usecase/authentication/Usecase'

import {
  Container
} from './styles'

const ManagerStorePage = () => {
  useEffect(() => {
    if (!AuthenticationManager.isLogged()) {
      Router.replace(getLoginPath())
    }
    if (!AuthenticationManager.hasStore()) {
      Router.replace(getOpenStoreInitital())
    }
  }, [])

  return (
    <Container>
      <Header />
      manage page
    </Container>
  )
}

export async function getStaticProps (context) {
  return {
    props: { }
  }
}

export default ManagerStorePage
