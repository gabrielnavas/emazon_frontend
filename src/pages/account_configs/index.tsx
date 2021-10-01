import { useCallback, useEffect } from 'react'
import Router from 'next/router'

import { getLoginPath, getSalesManConfigsPath } from '../../config/routesPath'

import * as authenticatorUsecase from '../../usecase/authentication/Usecase'

import Header from '../../components/Header'
import Option from '../../components/pages/account_configs/Option'

import {
  Container,
  Content,
  Options,
  Title
} from './styles'

import {
  // IconPackage,
  // IconSecurity,
  // IconAddress,
  IconSeller,
  IconLogOut
} from '../../icons'

const AccountConfigsPage = () => {
  useEffect(() => {
    if (!authenticatorUsecase.isLogged()) {
      Router.replace(getLoginPath())
    }
  }, [authenticatorUsecase.isLogged])

  const handleLogout = useCallback(() => {
    authenticatorUsecase.logOut()
    Router.replace(getLoginPath())
  }, [authenticatorUsecase.logOut])

  return (
    <Container>
      <Header />
      <Content>
        <Title>Sua conta</Title>
        <Options>
          {/* <Option
            href='#'
            icon={<IconPackage />}
            title='Seus pedidos'
            description='Rastrear, cancelar ou  comprar livros novamente.'
          />
          <Option
            href='#'
            icon={<IconSecurity />}
            title='Acesso e segurança'
            description='Alterar o email, senha.'
          />
          <Option
            href='#'
            icon={<IconAddress />}
            title='Endereços'
            description='Alterar, adicionar ou excluir algum endereço.'
          /> */}
          <Option
            href={getSalesManConfigsPath()}
            icon={<IconSeller />}
            title='Vendedor'
            description='Tornar-se vendedor na plataforma e gerenciar a loja.'
          />
          <Option
            href='#'
            onClick={handleLogout}
            icon={<IconLogOut />}
            title='Sair'
            description='Deslogar da conta atual.'
          />
        </Options>
      </Content>
    </Container>
  )
}

export async function getStaticProps (context) {
  return {
    props: { }
  }
}

export default AccountConfigsPage
