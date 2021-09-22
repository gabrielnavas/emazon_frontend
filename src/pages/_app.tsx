import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../styles/Global'

import { theme } from '../styles/Themes'

export default function App ({ Component, pageProps }: any) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
