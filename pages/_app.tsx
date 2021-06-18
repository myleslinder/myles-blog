import '../styles/globals.css'
import '@reach/dialog/styles.css'
import 'tailwindcss/tailwind.css'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { Footer } from '../components/Footer'
import { Navigation } from '../components/Navigation'

const App = ({ Component, pageProps }: AppProps) => (
  <div
    className="antialiased min-h-screen isolate dark:bg-gray-900 dark:text-white"
    // style={{ transition: 'color 0.2s ease-out, background 0.2s ease-out' }}
  >
    <Head>
      <link rel="icon" href="/M-logo.svg" />
      <title>Myles Linder</title>
      <meta name="description" content="Myles Linder's personal site"></meta>
    </Head>
    <ThemeProvider attribute="class">
      <div className="max-w-4xl mx-auto sm:px-12 px-6 lg:max-w-6xl ">
        <Navigation />
        <Component {...pageProps} />
        <Footer />
      </div>
    </ThemeProvider>
  </div>
)

export default App
