import Image from 'next/image'

import Header from '../../components/Header'
import { makeEndpointAPI } from '../../config/api'

import {
  IconStarFill,
  IconStarHalf,
  IconStarEmpty
} from '../../icons'
import * as date from '../../utils/date'
import { Book } from '../shop'

import {
  Container,
  Section,
  Left,
  Middle,
  Right,
  ImgBook,
  HeaderMiddle,
  HeaderTop,
  Title,
  TypeCover,
  PublishedAt,
  Edition,
  Language,
  Separator,
  Author,
  Feedback,
  Stars,
  CommentAmount,
  BarSeparate,
  Descrition,
  PriceContainer,
  Price,
  PriceNoDiscount,
  SavingContainer,
  SavingAmount,
  SavingsPercentage,
  ButtonAddToCart
} from './styles'

type Props = {
  book: Book
}

const BookViewPage = ({ book }: Props) => {
  return (
    <Container>
      <Header />
      <Section>
        <Left>
          <ImgBook>
            <Image src='/img_book1.jpg' width={183} height={268} />
          </ImgBook>
        </Left>
        <Middle>
          <HeaderMiddle>
            <HeaderTop>
              <Title>{book.title}</Title>
              <TypeCover>{book.typeCover.typeName}</TypeCover>
              <PublishedAt> – {date.dayMonthNameYear(book.publishedAt)}</PublishedAt>
            </HeaderTop>
            <Edition>
              <Language>Edição {book.language.name}</Language>
              <Separator> | </Separator>
              <Author>por <span>{book.author.name}</span> <span>(Autor)</span></Author>
            </Edition>
            <Feedback>
              <Stars>
                {Array(3).fill(<IconStarFill />)}
                <IconStarHalf />
                <IconStarEmpty />
              </Stars>
              <CommentAmount>17.123 avaliações de clientes</CommentAmount>
            </Feedback>
          </HeaderMiddle>
          <BarSeparate />
          <Descrition>{book.description}</Descrition>
        </Middle>
        <Right>
          <PriceContainer>
            <span>Comprar por</span>
            <Price>R${(book.price * (1 - book.discount)).toFixed(2)}</Price>
          </PriceContainer>
          <PriceNoDiscount>De: R${book.price}</PriceNoDiscount>
          <SavingContainer>
            <span>Você economiza: R$</span>
            <SavingAmount>{(book.price - (book.price * (1 - book.discount))).toFixed(2)}</SavingAmount>
            <SavingsPercentage>({(((book.price * (1 - book.discount)) / book.price) * 100).toFixed(0)}%)</SavingsPercentage>
          </SavingContainer>
          <ButtonAddToCart>Adicionar ao carrinho</ButtonAddToCart>
        </Right>
      </Section>
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

  return {
    props: { book: bookFixCamelCase }
  }
}

export default BookViewPage
