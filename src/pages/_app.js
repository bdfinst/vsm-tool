import '../styles/globals.css'
import '../styles/vsm.css'
import { ValueStreamProvider } from '../appContext/reactContext'

const MyApp = ({ Component, pageProps }) => {
  return (
    <ValueStreamProvider>
      <Component {...pageProps} />
    </ValueStreamProvider>
  )
}

export default MyApp
