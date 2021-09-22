import Header from '../../components/Header'
import Item from '../../components/pages/shop/BookItem'

import {
  Container,
  BookList
} from './styles'

const ShopPage = () => {
  return (
    <Container>
      <Header />
      <BookList>
        {
          Array(23)
            .fill(null)
            .map((_, index) => <Item key={index} />)
        }
      </BookList>
    </Container>
  )
}

export default ShopPage
