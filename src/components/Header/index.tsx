import { useEffect, useState } from 'react'
import Link from 'next/link'

import * as authenticatorUsecase from '../../usecase/authentication/Usecase'

import { PRIMARY_PAGE_SHOP } from '../pages/shop/Navigation'

import { IconSearch, IconCart } from '../../icons'
import {
  getAccountConfigsPath,
  getLoginPath,
  getShopPath
} from '../../config/routesPath'

import {
  Container,
  ContainerLeft,
  ContainerFill,
  ContainerRight,
  HeaderLink,
  Logo,
  InputSearch,
  FieldSearch,
  ButtonSearch,
  Profile,
  Orders,
  Cart,
  AmountBooks
} from './styles'

const Header = () => {
  const [userFirstName, setUserFirstName] = useState('')
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    if (authenticatorUsecase.isLogged()) {
      const authData = authenticatorUsecase.get()
      const firstName = authData.user.fullName.split(' ')[0]
      setUserFirstName(firstName)
      setIsLogged(true)
    }
  }, [])

  return (
    <Container>
      <ContainerLeft>
        <HeaderLink>
          <Link href={getShopPath(PRIMARY_PAGE_SHOP.toString())}>
            <Logo>
              Emazon books
            </Logo>
          </Link>
        </HeaderLink>
      </ContainerLeft>
      <ContainerFill>
        <InputSearch>
        <FieldSearch />
        <ButtonSearch>
          <IconSearch />
        </ButtonSearch>
        </InputSearch>
      </ContainerFill>
      <ContainerRight>
      <HeaderLink>
        <Link href={isLogged ? getAccountConfigsPath() : getLoginPath()}>
          <Profile>
            <span>
              Olá, {isLogged ? userFirstName : 'faça seu login'}
            </span>
            <span>
            {isLogged ? 'Minha conta' : 'Não tem conta?'}
            </span>
          </Profile>
        </Link>
      </HeaderLink>
      <HeaderLink>
        <Link href='#'>
          <Orders>
            <span>
              Pedidos
            </span>
            <span>
              e Detalhes
            </span>
          </Orders>
        </Link>
      </HeaderLink>
      <HeaderLink>
        <Link href='#'>
          <Cart>
            <AmountBooks>
              12
            </AmountBooks>
            <IconCart />
          </Cart>
        </Link>
      </HeaderLink>
      </ContainerRight>
    </Container>
  )
}

export default Header
