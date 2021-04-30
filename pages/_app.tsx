import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'

const Footer = () => {
  return (
    <div className="sticky h-16 bottom-0 left-0 px-8 border-t border-gray-100 w-full flex justify-between font-mono items-center">
      <div className="flex justify-between max-w-lg items-center">
        <div className="px-4">
          <img src="/TwitterIcon.svg" width="18" />
        </div>
        <div className="px-4">
          <img src="/LinkedInIcon.svg" width="18" />
        </div>
        <div className="px-4">
          <img src="/SpotifyIcon.svg" width="18" />
        </div>
        <div className="px-4">
          <img src="/GithubIcon.svg" width="18" />
        </div>
        {/* <div className="px-4">
        <img src="/FigmaIcon.svg" width="18" />
      </div> */}
      </div>
      <div className="max-w-lg">
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
      <ul className="flex justify-around">
        <li>
          <button className="px-6 border-blue-600 rounded-lg border py-2 text-blue-600">
            <a href="/Myles-Linder-Resume.pdf" target="_blank">
              Resume
            </a>
          </button>
        </li>
        {/* <li className="px-6">About</li> */}
      </ul>
    </nav>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <Component {...pageProps} />
    </div>
  </div>
)

export default App
