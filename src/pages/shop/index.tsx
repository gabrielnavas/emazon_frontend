import { useEffect } from 'react'
import Router from 'next/router'

import Header from '../../components/Header'
import Item from '../../components/pages/shop/BookItem'

import { TokenManager } from '../../usecase/authentication/Usecase'

import {
  Container,
  BookList
} from './styles'
import { getLoginPath } from '../../config/routesPath'

export type Book = {
  id: number
  title: string
  price: number
  discount: number
  description: string
  pagesAmount: number
  heigh: number,
  width: number,
  thickness: number,
  publishedAt: Date,
  publishingCompany: {
    name: string
  },
  author: {
      name: string
  },
  typeCover: {
      typeName: string
  },
  language: {
      code: string
      name: string
  },
  category: {
      name: string
  }
}

type Props = {
  books: Book[]
}

const ShopPage = ({ books }: Props) => {
  useEffect(() => {
    const tokenManager = new TokenManager()
    if (!tokenManager.isLogged()) {
      Router.replace(getLoginPath())
    }
  }, [TokenManager, Router, getLoginPath])

  return (
    <Container>
      <Header />
      <BookList>
        { books.map(book => <Item key={book.id} book={book} />) }
      </BookList>
    </Container>
  )
}

export async function getStaticProps (context) {
  // const response = await fetch(makeEndpointAPI('books'), {
  //   method: 'GET',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json'
  //   }
  // })

  // const books = await response.json()
  // console.log(books)

  // const fixCamelCase = books.map(book => {
  //   // eslint-disable-next-line camelcase
  //   const { pages_amount, type_cover, published_at, publishing_company, ...rest } = book
  //   const bookFixCamelCase = {
  //     ...rest,
  //     pagesAmount: book.pages_amount,
  //     typeCover: {
  //       typeName: book.type_cover.type_name
  //     },
  //     publishedAt: book.published_at,
  //     publishingCompany: book.publishing_company
  //   }
  //   return bookFixCamelCase
  // })
  // return {
  //   props: { books: fixCamelCase }
  // }
  return {
    props: { books: [] as Book[] }
  }
}

export default ShopPage
