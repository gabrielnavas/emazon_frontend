import Header from '../../components/Header'
import Item from '../../components/pages/shop/BookItem'
import { ENDPOINT_API } from '../../config/api'

import {
  Container,
  BookList
} from './styles'

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
  return (
    <Container>
      <Header />
      <BookList>
        {
          books.map(book => <Item key={book.id} book={book} />)
        }
      </BookList>
    </Container>
  )
}

export async function getStaticProps (context) {
  const response = await fetch(`${ENDPOINT_API}/books`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  const books = await response.json()
  const fixCamelCase = books.map(book => ({
    ...book,
    pagesAmount: book.pages_amount,
    typeCover: {
      typeName: book.type_cover.type_name
    }
  }) as Book)

  return {
    props: { books: fixCamelCase }
  }
}

export default ShopPage
