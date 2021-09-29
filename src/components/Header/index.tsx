import Link from 'next/link'

import { IconSearch, IconCart } from '../../icons'
import { getShopPath } from '../../config/routesPath'

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
  return (
    <Container>
      <ContainerLeft>
        <HeaderLink>
          <Link href={getShopPath('0')}>
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
        <Link href='#'>
          <Profile>
            <span>
              Olá, faça seu login
            </span>
            <span>
              Não tem conta?
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
