import { getShopPath } from '../config/routesPath'

export default function Home () {
  return <></>
}

export async function getServerSideProps (context) {
  return {
    redirect: {
      destination: getShopPath('0'),
      permanent: false
    }
  }
}
