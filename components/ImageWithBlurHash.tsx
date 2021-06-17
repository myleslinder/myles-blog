import { Blurhash } from 'react-blurhash'
import useLoadImage from '../hooks/useLoadImage'

export default function ImageWithBlurHash({ hash, url, attribution }) {
  const imgLoaded = useLoadImage(url)
  const utmSource = encodeURIComponent('Myles Personal Site')
  const Attr = () => (
    <p className="absolute bottom-0 left-0 right-0 text-gray-300 text-xs text-right p-2">
      Photo by{' '}
      <a
        href={`${attribution.url}?utm_source=${utmSource}&utm_medium=referral`}
      >
        {attribution.name}
      </a>{' '}
      on{' '}
      <a
        href={`https://unsplash.com/?utm_source=${utmSource}&utm_medium=referral`}
      >
        Unsplash
      </a>
    </p>
  )

  return (
    <div className="w-full h-full relative rounded-lg">
      <Blurhash
        hash={hash}
        width={'100%'}
        height={'100%'}
        className="w-full h-full absolute top-o left-0 right-0 bottom-0 rounded-lg"
      />
      <img
        src={url}
        className="w-full h-full absolute top-o left-0 right-0 bottom-0  rounded-lg"
        style={{ display: imgLoaded ? 'block' : 'none' }}
      />
      <Attr />
    </div>
  )
}
