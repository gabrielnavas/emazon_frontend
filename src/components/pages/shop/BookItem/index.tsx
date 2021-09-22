import Image from 'next/image'

import {
  IconStarFill,
  IconStarHalf,
  IconStarEmpty
} from '../../../../icons'

import {
  Container,
  BorderTop,
  ImgBook,
  Title,
  Edition,
  Language,
  Author,
  Feedback,
  Stars,
  CommentAmount,
  TypeCover,
  PriceDiscount,
  PriceInfo,
  PriceSymbol,
  PriceWhole,
  PriceFraction,
  PriceOldValue

} from './styles'

const Item = () => {
  return (
    <Container>
      <BorderTop />
      <ImgBook>
        <Image src='/img_book1.jpg' width={183} height={268} />
      </ImgBook>
      <Title>A garota do lago</Title>
      <Edition>
        <Language>Edição Português</Language>
        <Author>Por Charlie Donlea</Author>
      </Edition>
      <Feedback>
        <Stars>
          {Array(3).fill(<IconStarFill />)}
          <IconStarHalf />
          <IconStarEmpty />
        </Stars>
        <CommentAmount>17.123</CommentAmount>
      </Feedback>
      <TypeCover>Capa Comum</TypeCover>
      <PriceInfo>
        <PriceDiscount>
          <PriceSymbol>R$</PriceSymbol>
          <PriceWhole>8</PriceWhole>
          <PriceFraction>30</PriceFraction>
        </PriceDiscount>
        <PriceOldValue>R$44,90</PriceOldValue>
      </PriceInfo>
    </Container>
  )
}

export default Item
