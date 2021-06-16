import { useEffect } from 'react'
import { ReplyIcon, ChevronDoubleRightIcon } from '@heroicons/react/outline'

import getRandomNumFromRange from '../utils/getRandomNumFromRange'
import useUnsplashPhotos from '../hooks/useUnsplashPhotos'
import CurrentWeather from './CurrentWeather'
import ImageWithBlurHash from './ImageWithBlurHash'
import { getCurrentDateString, getCurrentTimeString } from '../utils/datetime'
import SpotifyNowPlaying from './SpotifyNowPlaying'

export default function Now() {
  const date = getCurrentDateString()
  const time = getCurrentTimeString()

  const unsplashPhotos = useUnsplashPhotos('Vancouver')
  const randomPhotoIndex = getRandomNumFromRange(0, unsplashPhotos.length)

  useEffect(() => {
    console.log(unsplashPhotos)
  }, [unsplashPhotos])

  return (
    <div>
      <div>My current situation in Vancouver, Canada</div>
      <div
        className="rounded-lg shadow-2xl relative isolate"
        style={{
          width: 440,
          //   background: `url("${imgUrl}") 100% / cover`,
        }}
      >
        {unsplashPhotos.length ? (
          <div
            className="absolute top-0 left-0 bottom-0 right-0 w-full h-full rounded-lg"
            style={{ zIndex: -1 }}
          >
            <ImageWithBlurHash
              hash={unsplashPhotos[randomPhotoIndex].blur_hash}
              url={unsplashPhotos[randomPhotoIndex].urls.full}
            />
          </div>
        ) : null}
        <div className="text-xs font-medium flex justify-between items-center bg-black rounded-t-lg px-6 py-1 backdrop-filter backdrop-blur-lg bg-opacity-40 text-white">
          <CurrentWeather />
          <p>
            {date} {time}
          </p>
        </div>
        <div className="h-48 py-8 px-4">{/* <FakeDesktopWindow /> */}</div>
        <SpotifyNowPlaying />
      </div>
    </div>
  )
}

const ComputerCloseButton = ({ color }) => {
  return <div className={`bg-${color}-600 rounded-full h-3 w-3`}></div>
}

const FakeDesktopWindow = () => {
  return (
    <div className="bg-gray-800 rounded-md h-full">
      <div className="bg-gray-100 flex gap-x-2 p-2 rounded-t-md relative -top-1">
        <div className={`bg-red-500 rounded-full h-2 w-2`}></div>
        <div className={`bg-yellow-500 rounded-full h-2 w-2`}></div>
        <div className={`bg-green-500 rounded-full h-2 w-2`}></div>
      </div>
      <div className="text-sm text-green-600 flex flex-wrap gap-x-1 p-3">
        <div>
          <ChevronDoubleRightIcon className="h-4 w-4 text-green-600 inline-block mr-3" />
          <span>some previous command</span>
        </div>
      </div>
      <div className="flex mx-2 gap-x-2">
        <div className="bg-gray-700 rounded-sm p-2 text-white flex-grow">
          content
        </div>
        <button className="bg-white text-black p-2 rounded-sm">
          <ReplyIcon
            className="h-4 w-4"
            style={{ transform: 'scale(-1, -1)' }}
          />
        </button>
      </div>
    </div>
  )
}