import '/styles/globals.css'
import connectDB from '../database/db'
connectDB();
export default function App({ Component, pageProps }) {

  return <Component {...pageProps} />
}
