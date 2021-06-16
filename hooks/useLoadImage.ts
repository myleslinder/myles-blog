import { useState, useEffect } from 'react'

const loadImage = (url: string) => {
  return new Promise((res, rej) => {
    const img = new Image()
    img.onload = () => res(img)
    img.onerror = (...args) => rej(args)
    img.src = url
    console.log('loading image')
  })
}

export default function useLoadImage(url: string) {
  const [imgLoaded, setImgLoaded] = useState(false)
  useEffect(() => {
    loadImage(url).then(setImgLoaded)
  }, [url])
  return imgLoaded
}
