import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'
import Link from 'next/link'

import { MailIcon } from '@heroicons/react/outline'

const Footer = () => {
  return (
    <div className="bg-white sticky h-16 bottom-0 left-0 px-8 border-t border-gray-100 w-full flex justify-between font-mono items-center z-50">
      <div className="flex justify-between max-w-lg items-center">
        <div className="px-4">
          <a href="https://twitter.com/myleslinder" target="_blank">
            <span className="hidden">Twitter</span>
            <img src="/TwitterIcon.svg" width="18" alt="Twitter Logo" />
          </a>
        </div>
        <div className="px-4">
          <a
            href="https://www.linkedin.com/in/myles-linder-bb234347/"
            target="_blank"
          >
            <span className="hidden">LinkedIn</span>
            <img src="/LinkedInIcon.svg" width="18" />
          </a>
        </div>
        <div className="px-4">
          <a href="https://open.spotify.com/user/myleslinder" target="_blank">
            <span className="hidden">Spotify</span>
            <img src="/SpotifyIcon.svg" width="18" />
          </a>
        </div>
        <div className="px-4">
          <a href="https://github.com/myleslinder" target="_blank">
            <span className="hidden">Github</span>
            <img src="/GithubIcon.svg" width="18" />
          </a>
        </div>
        {/* <div className="px-4">
        <img src="/FigmaIcon.svg" width="18" />
      </div> */}
      </div>
      <div className="max-w-lg flex items-center justify-between">
        <MailIcon className="h-5 w-5 mr-2" />
        <p className="text-sm">myles.linder@gmail.com</p>
      </div>
    </div>
  )
}

const App = ({ Component, pageProps }: AppProps) => (
  <div className="antialiased">
    <nav className=" max-w-4xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0 flex justify-between py-8 items-center">
      <div>
        <img src="/M-logo.svg" width="65" />
      </div>
      <ul className="flex justify-around font-mono items-center">
        <li className="px-6">
          <Link href="#about-me">
            <a>About</a>
          </Link>
        </li>
        <li>
          <button className="px-6 border-blue-600 rounded-lg border py-2 text-blue-600">
            <a href="/Myles-Linder-Resume.pdf" target="_blank">
              Resume
            </a>
          </button>
        </li>
      </ul>
    </nav>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <Component {...pageProps} />
    </div>
    <Footer />
  </div>
)

export default App
