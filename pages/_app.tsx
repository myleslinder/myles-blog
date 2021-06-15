import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { Footer } from '../components/Footer'
import { Navigation } from '../components/Navigation'

const App = ({ Component, pageProps }: AppProps) => (
  <div className="antialiased min-h-screen">
    <Head>
      <link rel="icon" href="/M-logo.svg" />
      <title>Myles Linder</title>
      <meta name="description" content="Myles Linder's personal site"></meta>
    </Head>
    <div className="max-w-4xl mx-auto sm:px-12 px-6 lg:max-w-6xl">
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </div>
  </div>
)

export default App
