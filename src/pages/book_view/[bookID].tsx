import Header from '../../components/Header'
import { makeEndpointAPI } from '../../config/api'
import { Book } from '../shop'

import {
  Container
} from './styles'

type Props = {
  book: Book
}

const BookViewPage = ({ book }: Props) => {
  return (
    <Container>
      <Header />
      <div>FALTA MONTAR INTERFACE MOSTRAR O BOOK</div>
    </Container>
  )
}

export async function getStaticPaths () {
  const response = await fetch(makeEndpointAPI('books?get_ids=true'), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  const bookIDs = await response.json()
  const params = bookIDs.map((id: number) => ({ params: { bookID: `${id}` } }))

  return {
    paths: [...params],
    fallback: false
  }
}

export async function getStaticProps (context) {
  const { bookID } = context.params

  const response = await fetch(makeEndpointAPI(`books/${bookID}`), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  const book = await response.json()
  // eslint-disable-next-line camelcase
  const { pages_amount, type_cover, ...rest } = book
  const bookFixCamelCase = {
    ...rest,
    pagesAmount: book.pages_amount,
    typeCover: {
      typeName: book.type_cover.type_name
    }
  }

  return {
    props: { book: bookFixCamelCase }
  }
}

export default BookViewPage
