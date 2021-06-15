import { useEffect } from 'react'

export default function useMobileResize(handlers: any[], size = 1000) {
  const handleResize = () => {
    let isMobile = window.innerWidth < size
    handlers.forEach(handler => handler(isMobile))
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
}
