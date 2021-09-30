import Header from '../../components/Header'

import {
  Container,
  Content,
  Options,
  Title
} from './styles'

import {
  IconPackage,
  IconSecurity,
  IconAddress,
  IconSeller
} from '../../icons'

import Option from '../../components/pages/account_configs/Option'

const RegisterPage = () => {
  return (
    <Container>
      <Header />
      <Content>
        <Title>Sua conta</Title>
        <Options>
          <Option
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
          />
          <Option
            href='#'
            icon={<IconSeller />}
            title='Vendedor'
            description='Tornar-se vendedor na plataforma ou adicionar livros.'
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

export default RegisterPage
