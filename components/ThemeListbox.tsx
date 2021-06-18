import { useEffect, useState } from 'react'

import { Listbox, Transition } from '@headlessui/react'

import { useTheme } from 'next-themes'
import { DesktopComputerIcon, MoonIcon, SunIcon } from '@heroicons/react/solid'

export default function ThemeListbox() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null
  const isLight = theme === 'light'
  const isDark = theme === 'dark'
  const Icon = isLight ? SunIcon : isDark ? MoonIcon : DesktopComputerIcon
  const label = isLight ? 'Light Theme' : isDark ? 'Dark Theme' : 'System Theme'
  const handleThemeChange = () => {
    if (isLight) {
      setTheme('dark')
    } else if (isDark) {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }
  // need accessibility for the icon
  {
    /* <VisuallyHidden id={labelId}>Choose a taco</VisuallyHidden> */
  }
  return (
    <div className="w-5">
      <Listbox
        value={theme}
        onChange={v => {
          setTheme(v)
        }}
      >
        <Listbox.Button className="p-2 bg-gray-200 rounded-md dark:bg-gray-700">
          <Icon className="h-5 w-5" />
        </Listbox.Button>
        <div className="relative">
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            className="absolute bg-white dark:bg-gray-900 mt-1 border dark:border-gray-700 rounded-md"
          >
            <Listbox.Options className="w-full">
              <Listbox.Option value="system">
                {({ active, selected }) => (
                  <div
                    className={`p-2 rounded-md flex justify-center items-center ${
                      selected ? 'text-blue-700' : ''
                    } ${
                      active
                        ? 'bg-gray-200 dark:bg-gray-700  dark:text-white'
                        : ''
                    }`}
                  >
                    <DesktopComputerIcon className="h-5 w-5" />
                  </div>
                )}
              </Listbox.Option>
              <Listbox.Option value="light">
                {({ active, selected }) => (
                  <div
                    className={`p-2 rounded-md ${
                      selected ? 'text-blue-700' : ''
                    } ${
                      active
                        ? 'bg-gray-200 dark:bg-gray-700 dark:text-white'
                        : ''
                    }`}
                  >
                    <SunIcon className="h-5 w-5 fill-current" />
                  </div>
                )}
              </Listbox.Option>
              <Listbox.Option value="dark">
                {({ active, selected }) => (
                  <div
                    className={`p-2 rounded-md ${
                      selected ? 'text-blue-700' : ''
                    } ${
                      active
                        ? 'bg-gray-200 dark:bg-gray-700 dark:text-white'
                        : ''
                    }`}
                  >
                    <MoonIcon className="h-5 w-5" />
                  </div>
                )}
              </Listbox.Option>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {/* <button
        onClick={() => handleThemeChange()}
        className="p-2 bg-gray-200 rounded-md dark:bg-gray-700"
      >
        <Icon className="h-5 w-5" />
        <span className="hidden">{label}</span>
      </button> */}
    </div>
  )
}
