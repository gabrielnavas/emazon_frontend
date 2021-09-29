import Link from 'next/link'

import {
  Container,
  ButtonPageNumber,
  ButtonLimit,
  Dots,
  ButtonNextPage
} from './styles'

import {
  IconArrowLeftPagination,
  IconArrowRightPagination
} from '../../../../icons'
import { getShopPath } from '../../../../config/routesPath'

type Props = {
  currectPage: number
  limit: number
}

const PRIMARY_PAGE = 0

const NavigationShop = ({ currectPage, limit }: Props) =>
  <Container>
    <Link
      href={currectPage === PRIMARY_PAGE ? getShopPath((currectPage).toString()) : getShopPath((currectPage - 1).toString())}>
      <ButtonNextPage
        isPrimaryPage={currectPage === PRIMARY_PAGE}
        isRightButton>
          <IconArrowLeftPagination />
          Anterior
      </ButtonNextPage>
    </Link>
    {
      getRange(currectPage, limit)
        .map((numberPage, index) => (
          <Link
            key={index}
            href={getShopPath((numberPage).toString())}>
            <ButtonPageNumber
              key={numberPage}
              currectPage={currectPage === numberPage}>
              {numberPage}
            </ButtonPageNumber>
          </Link>
        ))
    }
    {
      currectPage < limit && (
        <>
          <Dots>...</Dots>
          <ButtonLimit>{limit}</ButtonLimit>
        </>
      )
    }
    <Link
      href={currectPage === limit ? getShopPath((currectPage).toString()) : getShopPath((currectPage + 1).toString())}>
      <ButtonNextPage isLastPage={currectPage === limit}>
        Próximo
      <IconArrowRightPagination />
      </ButtonNextPage>
    </Link>
  </Container>

const getRange = (currectPage: number = PRIMARY_PAGE, limit: number) => {
  const start = currectPage > PRIMARY_PAGE ? currectPage - 1 : currectPage
  const end = currectPage + 2
  return Array(end - start + 1)
    .fill(undefined)
    .map((_, idx) => start + idx)
    .filter(n => n <= limit)
}

export default NavigationShop
