import Image from 'next/image'

import Header from '../../components/Header'

import {
  IconStarFill,
  IconStarHalf,
  IconStarEmpty
} from '../../icons'
import { getBookUseCaseFactory } from '../../usecase/shop/book_view'
import { Book } from '../../usecase/shop/book_view/Entity'
import * as date from '../../utils/date'

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
  const getBookUsecase = getBookUseCaseFactory()
  const result = await getBookUsecase.getBookIDs()
  const params = result.booksID.map(id => ({ params: { bookID: `${id}` } }))
  return {
    paths: [...params],
    fallback: false
  }
}

export async function getStaticProps (context) {
  const { bookID } = context.params
  const getBookUsecase = getBookUseCaseFactory()
  const book = await getBookUsecase.getBook(bookID)
  return {
    props: { book }
  }
}

export default BookViewPage
