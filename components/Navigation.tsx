import Link from 'next/link'
import { ExternalLinkIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import useMobileResize from '../hooks/useMobileResize'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import { Dialog } from '@reach/dialog'
import MLogo from '../icons/MLogo'

import { useTheme } from 'next-themes'
import { DesktopComputerIcon, MoonIcon, SunIcon } from '@heroicons/react/solid'
const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null
  const isLight = theme === 'light'
  const isDark = theme === 'dark'
  const Icon = isLight ? SunIcon : isDark ? MoonIcon : DesktopComputerIcon

  const handleThemeChange = () => {
    if (isLight) {
      setTheme('dark')
    } else if (isDark) {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }
  return (
    <div>
      <button
        onClick={() => handleThemeChange()}
        className="p-2 bg-gray-200 rounded-md dark:bg-gray-700"
      >
        <Icon className="h-5 w-5" />
      </button>
    </div>
  )
}

const Menu = ({ isMobile = false, beforeNavigation = () => {} }) => {
  const router = useRouter()
  const handleHashChange = () => {
    beforeNavigation()
    return true
  }
  useEffect(() => {
    router.events.on('hashChangeStart', handleHashChange)
    return () => {
      router.events.off('hashChangeStart', handleHashChange)
    }
  }, [])

  const classList = `flex justify-around font-mono items-center ${
    isMobile
      ? 'flex-col w-full bg-white dark:bg-gray-900 text-lg'
      : 'flex-row text-sm'
  }`
  const itemClassList = isMobile
    ? 'py-6 border-gray-300 border-b w-full text-center'
    : 'px-6'
  return (
    <ul className={classList}>
      <li className={itemClassList}>
        <Link href="#about-me">
          <a>About</a>
        </Link>
      </li>
      <li className={itemClassList}>
        <Link href="#experience">
          <a>Experience</a>
        </Link>
      </li>
      <li className={itemClassList}>
        <Link href="#projects">
          <a>Projects</a>
        </Link>
      </li>
      {/* <li className="px-6">
    <Link href="/posts">
      <a>Blog</a>
    </Link>
  </li> */}
      {/* <li>
    <button className="px-6 border-blue-600 rounded-lg border py-2 text-blue-600 flex justify-center items-center">
      <a href="/Myles-Linder-Resume.pdf" target="_blank">
        Resume
      </a>
      <ExternalLinkIcon className="h-4 w-4 ml-2" />
    </button>
  </li> */}
      <li>
        <ThemeChanger />
      </li>
    </ul>
  )
}

const NavigationMenu = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  // mobile resize will call the function with a t/f value
  // basically if it calls it with f then we need to close it
  const handleResize = (b: boolean) => setIsOpen(b && isOpen)
  useMobileResize([setIsMobile, handleResize], 700)

  const close = () => setIsOpen(false)
  if (isMobile) {
    return (
      <>
        <button onClick={() => setIsOpen(true)}>
          <span className="hidden">Menu</span>
          <MenuIcon className="h-7 w-7" />
        </button>
        <Dialog
          isOpen={isOpen}
          onDismiss={close}
          className="w-full p-6 m-0 dark:bg-gray-900"
          aria-label="Navigation Menu"
        >
          <div className="w-full flex flex-col items-end">
            <button onClick={close}>
              <span className="hidden">Close</span>
              <XIcon className="h-7 w-7" />
            </button>
            <Menu
              isMobile={isMobile}
              beforeNavigation={() => setIsOpen(false)}
            />
          </div>
        </Dialog>
      </>
    )
  }
  return <Menu />
}

export const Navigation = () => {
  return (
    <nav className="mx-auto flex justify-between py-5 items-center sticky top-0 bg-white dark:bg-gray-900 z-10">
      <div>
        <Link href="/">
          <a>
            <span className="hidden">Home</span>
            {/* <img alt="M-Logo" src="/M-logo.svg" width="65" /> */}
            <MLogo />
          </a>
        </Link>
      </div>
      <NavigationMenu />
    </nav>
  )
}
