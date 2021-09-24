import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import * as pathRoutes from '../../../../config/routesPath'

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

const Item = ({ book }: Props) => {
  const [price, setPrice] = useState('')
  const [fraction, setFraction] = useState('')
  const [realPrice, setRealPrice] = useState('')

  useEffect(() => {
    const fraction = makeFraction(book.price, book.discount)
    setFraction(fraction)
  }, [])

  useEffect(() => {
    const whole = makeWhole(book.price, book.discount)
    setPrice(whole)
  }, [])

  useEffect(() => {
    const realPrice = makeRealPrice(book.price)
    setRealPrice(realPrice)
  }, [])

  return (
    <Container>
      <BorderTop />
      <Link href={pathRoutes.getBookViewPath(book.id)}>
        <ImgBook>
            <Image src='/img_book1.jpg' width={183} height={268} />
        </ImgBook>
      </Link >
      <Link href={pathRoutes.getBookViewPath(book.id)}>
        <Title>{book.title}</Title>
      </Link>
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

const makePriceWithDiscount = (price: number, discount: number): string[] => {
  const priceWithDiscount = price * (1 - discount)
  const splited = priceWithDiscount.toString().split('.')
  if (splited.length === 1) {
    return [splited[0], '0']
  }
  return splited
}

const makeWhole = (price: number, discount: number): string => {
  const priceSplited = makePriceWithDiscount(price, discount)
  const whole = priceSplited[0]
  return whole
}

const makeFraction = (price: number, discount: number): string => {
  const fractionSplited = makePriceWithDiscount(price, discount)
  const fraction = parseInt(fractionSplited[1])
  if (fraction < 10) {
    const fractionWithLeftZero = `0${fraction}`
    return fractionWithLeftZero
  }
  return fraction.toString()
}

const makeRealPrice = (realPrice: number): string => {
  const priceSplited = realPrice.toString().split('.')
  if (priceSplited.length === 1) {
    const priceWithTwoZeros = `R$${priceSplited[0]},00`
    return priceWithTwoZeros
  } else if (priceSplited.length === 2) {
    const fraction = Number(priceSplited[1])
    if (fraction < 10) {
      const priceWithOneLeftZero = `R$${priceSplited[0]},0${priceSplited[1]}`
      return priceWithOneLeftZero
    } else {
      const defaultValue = `R$${priceSplited[0]},${priceSplited[1]}`
      return defaultValue
    }
  }
}

const capitalize = (str: string) =>
  `${str[0].toUpperCase()}${str.substring(1, str.length)}`

export default Item
