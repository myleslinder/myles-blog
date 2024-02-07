import { GlobeAltIcon, MailIcon, XIcon } from '@heroicons/react/outline'
import { useReducer, useState } from 'react'
import useMobileResize from '../hooks/useMobileResize'
import GithubIcon from '../icons/GithubIcon'
import LinkdedInIcon from '../icons/LinkedInIcon'
import SpotifyIcon from '../icons/SpotifyIcon'
import TwitterIcon from '../icons/TwitterIcon'

function drawerStateReducer(state, action) {
  if (action === 'SHOW_SOCIAL' && state === 'CLOSED') {
    return 'SOCIAL'
  }
  if (action === 'SHOW_EMAIL' && state === 'CLOSED') {
    return 'EMAIL'
  }
  if (action === 'CLOSE' && state !== 'CLOSED') {
    return 'CLOSED'
  }
  return state
}

export const Footer = () => {
  const [drawerState, dispatch] = useReducer(drawerStateReducer, 'CLOSED')
  const [isMiniMenu, setIsMiniMenu] = useState(false)
  useMobileResize([setIsMiniMenu], 700)

  const isSocialOpen = drawerState === 'SOCIAL'

  return (
    <div
      className={`bg-white dark:bg-gray-900 flex justify-between items-center sticky h-20 bottom-0 left-0 ${
        isSocialOpen ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      <SocialLinks
        isVisible={isMiniMenu ? drawerState === 'CLOSED' || isSocialOpen : true}
        isOpen={isMiniMenu ? isSocialOpen : true}
        onOpenRequest={() => dispatch('SHOW_SOCIAL')}
      />
      <MailLink
        isVisible={
          isMiniMenu
            ? drawerState === 'CLOSED' || drawerState === 'EMAIL'
            : true
        }
        isOpen={isMiniMenu ? drawerState === 'EMAIL' : true}
        onOpenRequest={() => dispatch('SHOW_EMAIL')}
      />
      {drawerState !== 'CLOSED' ? (
        <button className="p-2" onClick={() => dispatch('CLOSE')}>
          <XIcon className="h-5 w-5" />
        </button>
      ) : null}
    </div>
  )
}

const MailLink = ({ isOpen, isVisible, onOpenRequest }) => {
  if (!isVisible) {
    return null
  }
  if (isOpen) {
    return (
      <div className="max-w-lg flex items-center justify-between">
        <p className="text-sm font-mono">myles.linder@gmail.com</p>
      </div>
    )
  } else {
    return (
      <button
        className="flex flex-col justify-center items-center"
        onClick={() => {
          onOpenRequest()
        }}
      >
        <MailIcon className="h-5 w-5" />
        <p className="text-xs font-medium pt-2">Email</p>
      </button>
    )
  }
}

const SocialLinks = ({ isOpen, isVisible, onOpenRequest }) => {
  if (!isVisible) {
    return null
  }
  if (isOpen) {
    return (
      <div className="flex justify-between max-w-lg items-center">
        <div className="px-4">
          <a
            href="https://twitter.com/myleslinder"
            target="_blank"
            rel="noreferrer"
          >
            <span className="hidden">Twitter</span>
            {/* <img src="/TwitterIcon.svg" width="18" alt="Twitter Logo" /> */}
            <TwitterIcon />
          </a>
        </div>
        <div className="px-4">
          <a
            href="https://www.linkedin.com/in/myles-linder/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="hidden">LinkedIn</span>
            {/* <img src="/LinkedInIcon.svg" width="18" alt="LinkedIn Logo" /> */}
            <LinkdedInIcon />
          </a>
        </div>
        <div className="px-4">
          <a
            href="https://open.spotify.com/user/myleslinder"
            target="_blank"
            rel="noreferrer"
          >
            <span className="hidden">Spotify</span>
            {/* <img src="/SpotifyIcon.svg" width="18" alt="Spotify Logo" /> */}
            <SpotifyIcon />
          </a>
        </div>
        <div className="px-4">
          <a
            href="https://github.com/myleslinder"
            target="_blank"
            rel="noreferrer"
          >
            <span className="hidden">Github</span>
            {/* <img src="/GithubIcon.svg" width="18" alt="Github Logo" /> */}
            <GithubIcon />
          </a>
        </div>
        {/* <div className="px-4">
      <img src="/FigmaIcon.svg" width="18" />
    </div> */}
      </div>
    )
  } else {
    return (
      <button
        className="flex flex-col justify-center items-center p-2"
        onClick={() => {
          onOpenRequest()
        }}
      >
        <GlobeAltIcon className="h-5 w-5" />
        <p className="text-xs font-medium pt-2">Elsewhere</p>
      </button>
    )
  }
}
