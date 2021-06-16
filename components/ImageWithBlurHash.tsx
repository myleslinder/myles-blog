import { Blurhash } from 'react-blurhash'
import useLoadImage from '../hooks/useLoadImage'

export default function ImageWithBlurHash({ hash, url }) {
  const imgLoaded = useLoadImage(url)

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
    </div>
  )
}
