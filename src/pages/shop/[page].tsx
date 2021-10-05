import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import Header from '../../components/Header'
import Item from '../../components/pages/shop/BookItem'
import Navigation from '../../components/pages/shop/Navigation'

import { Book } from '../../usecase/shop/show_shop/Entity'
import { ShowShopUsecaseFactory } from '../../usecase/shop/show_shop'

import {
  Container,
  BookList,
  MessageDontHaveBooks
} from './styles'

const DONT_HAVE_BOOKS = 0
const SHOP_EMPTY = '-1'

type Props = {
  books: Book[],
  limitPage: number
}

const ShopPage = ({ books, limitPage }: Props) => {
  const router = useRouter()
  const page = Number(router.query.page)

  return (
    <Container>
      <Header />
      <BookList>
        { books.map((book, index) => <Item key={index} book={book} />) }
      </BookList>
      {
        page === DONT_HAVE_BOOKS
          ? <MessageDontHaveBooks>Não existem livros a venda ainda</MessageDontHaveBooks>
          : <Navigation currectPage={page} limit={limitPage} />
      }
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const showShopUsecase = ShowShopUsecaseFactory()
  const { rangePages } = await showShopUsecase.getLimitePage()

  if (rangePages.length === DONT_HAVE_BOOKS) {
    const params = [({ params: { page: SHOP_EMPTY } })]
    return {
      paths: params,
      fallback: false
    }
  }
  const params = rangePages.map((page: number) =>
    ({ params: { page: `${page}` } })
  )
  return {
    paths: params,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const page = Number(context.params.page)
  const showShopUsecase = ShowShopUsecaseFactory()
  const { books, limitPage } = await showShopUsecase.getBooksPaginate(page)
  if (books.length === DONT_HAVE_BOOKS) {
    return {
      props: {
        books: [],
        limitPage: DONT_HAVE_BOOKS
      }
    }
  }
  return {
    props: {
      books,
      limitPage
    }
  }
}

export default ShopPage
