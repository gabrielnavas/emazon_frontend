import { PRIMARY_PAGE_SHOP } from '../components/pages/shop/Navigation'
import { getShopPath } from '../config/routesPath'

export default function Home () {
  return <></>
}

export async function getServerSideProps (context) {
  return {
    redirect: {
      destination: getShopPath(PRIMARY_PAGE_SHOP.toString()),
      permanent: false
    }
  }
}
