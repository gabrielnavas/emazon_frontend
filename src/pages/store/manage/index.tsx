import Header from '../../../components/Header'

import {
  Container
} from './styles'

const ManagerStorePage = () => {
  // const InititalPage = () => {
  //   useEffect(() => {
  //     if (!authenticatorUsecase.isLogged()) {
  //       Router.replace(getLoginPath())
  //     }
  //     if (authenticatorUsecase.hasStore()) {
  //       Router.replace(getAccountConfigsPath())
  //     }
  //   }, [authenticatorUsecase.isLogged, authenticatorUsecase.hasStore])

  return (
    <Container>
      <Header />
      manage page
    </Container>
  )
}

export async function getStaticProps (context) {
  return {
    props: { }
  }
}

export default ManagerStorePage
