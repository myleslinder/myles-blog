import { useState, useEffect } from 'react'

// should accept a fallback url for if there's an error

const loadImage = (url: string) => {
  return new Promise((res, rej) => {
    const img = new Image()
    img.onload = () => res(img)
    img.onerror = (...args) => rej(args)
    img.src = url
  })
}

export default function useLoadImage(url: string) {
  const [imgLoaded, setImgLoaded] = useState(false)
  useEffect(() => {
    loadImage(url).then(setImgLoaded)
  }, [url])
  return imgLoaded
}
