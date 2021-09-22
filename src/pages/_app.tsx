import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../styles/Global'

import { themes } from '../styles/Themes'

export default function App ({ Component, pageProps }: any) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={themes}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
