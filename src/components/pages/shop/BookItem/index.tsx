import Image from 'next/image'
import { useEffect, useState } from 'react'

import {
  IconStarFill,
  IconStarHalf,
  IconStarEmpty
} from '../../../../icons'
import { Book } from '../../../../pages/shop'

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

type Props = {
  book: Book
}
const makePriceWithDiscount = (price: number, discount: number): string[] => {
  const priceWithDiscount = price * (1 - discount)
  const splited = priceWithDiscount.toString().split('.')
  if (splited.length === 1) {
    return [splited[0], '0']
  }
  return splited
}

const makeWhole = (price: number, discount: number): number => {
  const whole = makePriceWithDiscount(price, discount)[0]
  return parseInt(whole)
}

const makeFraction = (price: number, discount: number): number => {
  const fraction = makePriceWithDiscount(price, discount)[1]
  return parseInt(fraction)
}

const capitalize = (str: string) =>
  `${str[0].toUpperCase()}${str.substring(1, str.length)}`

const Item = ({ book }: Props) => {
  const [price, setPrice] = useState('')
  const [fraction, setFraction] = useState('')
  const [realPrice, setRealPrice] = useState('')

  useEffect(() => {
    const fraction = makeFraction(book.price, book.discount)
    if (fraction < 10) {
      const fractionWithLeftZero = `0${fraction}`
      setFraction(fractionWithLeftZero)
    } else {
      setFraction(fraction.toString())
    }
  }, [])

  useEffect(() => {
    const whole = makeWhole(book.price, book.discount)
    setPrice(whole.toString())
  }, [])

  useEffect(() => {
    const priceSplited = book.price.toString().split('.')
    if (priceSplited.length === 1) {
      setRealPrice(`R$${priceSplited[0]},00`)
    } else if (priceSplited.length === 2) {
      const fraction = Number(priceSplited[1])
      if (fraction < 10) {
        setRealPrice(`R$${priceSplited[0]},0${priceSplited[1]}`)
      } else {
        setRealPrice(`R$${priceSplited[0]},${priceSplited[1]}`)
      }
    }
  }, [])

  return (
    <Container>
      <BorderTop />
      <ImgBook>
        <Image src='/img_book1.jpg' width={183} height={268} />
      </ImgBook>
      <Title>{book.title}</Title>
      <Edition>
        <Language>{book.language.name}</Language>
        <Author>Por {book.author.name}</Author>
      </Edition>
      <Feedback>
        <Stars>
          {Array(3).fill(<IconStarFill />)}
          <IconStarHalf />
          <IconStarEmpty />
        </Stars>
        <CommentAmount>17.123</CommentAmount>
      </Feedback>
      <TypeCover>{capitalize(book.typeCover.typeName)}</TypeCover>
      <PriceInfo>
        <PriceDiscount>
          <PriceSymbol>R$</PriceSymbol>
          <PriceWhole>{price}</PriceWhole>
          <PriceFraction>{fraction}</PriceFraction>
        </PriceDiscount>
        <PriceOldValue>{realPrice}</PriceOldValue>
      </PriceInfo>
    </Container>
  )
}

export default Item
