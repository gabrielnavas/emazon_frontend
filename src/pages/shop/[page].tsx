import { GetStaticPaths, GetStaticProps } from 'next'

import Header from '../../components/Header'
import Item from '../../components/pages/shop/BookItem'
import Navigation from '../../components/pages/shop/Navigation'

import {
  Container,
  BookList
} from './styles'
import { makeEndpointAPI } from '../../config/api'
import { useRouter } from 'next/router'

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
  books: Book[],
  limitPage: number
}

const ShopPage = ({ books, limitPage }: Props) => {
  const router = useRouter()
  const { page } = router.query

  return (
    <Container>
      <Header />
      <BookList>
        { books.map((book, index) => <Item key={index} book={book} />) }
      </BookList>
      <Navigation currectPage={Number(page)} limit={limitPage} />
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(makeEndpointAPI('shop/book/?is_paginator_id=true&limit=0&book_per_page=10'), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json()
  const params = data.paginate_books.map((_, index) => ({ params: { page: `${index}` } }))

  return {
    paths: params,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const { page } = context.params

  const response = await fetch(makeEndpointAPI(`shop/book?is_paginator_id=true&limit=0&book_per_page=10&page=${page}`), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()

  const fixCamelCase = data.books.map(book => {
    // eslint-disable-next-line camelcase
    const { pages_amount, type_cover, published_at, publishing_company, ...rest } = book
    const bookFixCamelCase = {
      ...rest,
      pagesAmount: book.pages_amount,
      typeCover: {
        typeName: book.type_cover.type_name
      },
      publishedAt: book.published_at,
      publishingCompany: book.publishing_company
    }
    return bookFixCamelCase
  })

  return {
    props: {
      books: fixCamelCase,
      limitPage: data.limit_page
    }
  }
}

export default ShopPage
