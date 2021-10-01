import { useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'

import { getLoginPath, getOpenShopPath, getShopPath } from '../../config/routesPath'
import * as authenticatorUsecase from '../../usecase/authentication/Usecase'

import Header from '../../components/Header'

import {
  Container,
  Content,
  Title,
  Description,
  ButtonInitSalesMan
} from './styles'

const SalesManConfigPage = () => {
  useEffect(() => {
    if (!authenticatorUsecase.isLogged()) {
      Router.replace(getLoginPath())
    }
  }, [authenticatorUsecase.isLogged])

  return (
    <Container>
      <Header />
      <Content>
        <Title>Como vender na <span>Emazon</span></Title>
        <Description>Seja qual for o tamanho de seu negócio, a <Link href={getShopPath('0')}><span>Emazon</span></Link> é um dos meios mais rápidos para começar a vender seus livros na internet.</Description>
        <Description>Quando estiver pronto, clique em começar!</Description>
        <ButtonInitSalesMan onClick={() => Router.push(getOpenShopPath())}>Começar</ButtonInitSalesMan>
      </Content>
    </Container>
  )
}

export async function getStaticProps (context) {
  return {
    props: { }
  }
}

export default SalesManConfigPage
