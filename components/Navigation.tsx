import Link from 'next/link'
import { ExternalLinkIcon } from '@heroicons/react/outline'

export const Navigation = () => {
  return (
    <nav className="mx-auto flex justify-between py-5 items-center sticky top-0 bg-white z-50">
      <div>
        <Link href="/">
          <a>
            <span className="hidden">Home</span>
            <img alt="" src="/M-logo.svg" width="65" />
          </a>
        </Link>
      </div>
      <ul className="flex justify-around font-mono items-center text-sm">
        {/* <li className="px-6">
          <Link href="#about-me">
            <a>About</a>
          </Link>
        </li> */}
        {/* <li className="px-6">
          <Link href="/posts">
            <a>Blog</a>
          </Link>
        </li> */}
        <li>
          <button className="px-6 border-blue-600 rounded-lg border py-2 text-blue-600 flex justify-center items-center">
            <a href="/Myles-Linder-Resume.pdf" target="_blank">
              Resume
            </a>
            <ExternalLinkIcon className="h-4 w-4 ml-2" />
          </button>
        </li>
      </ul>
    </nav>
  )
}
