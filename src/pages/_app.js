import { Provider } from 'react-redux'
import { store } from '../app/store'
import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  )
}

// const MyApp = ({ Component, pageProps }) => {
//   return (

//       <Component {...pageProps} />
//   )
// }

export default MyApp
