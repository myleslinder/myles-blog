import { ReplyIcon, ChevronDoubleRightIcon } from '@heroicons/react/outline'

import getRandomNumFromRange from '../utils/getRandomNumFromRange'
import useUnsplashPhotos, {
  UnsplashPhotSearchResponse,
} from '../hooks/useUnsplashPhotos'
import CurrentWeather from './CurrentWeather'
import ImageWithBlurHash from './ImageWithBlurHash'
import { getCurrentDateString, getCurrentTimeString } from '../utils/datetime'
import SpotifyNowPlaying from './SpotifyNowPlaying'
import { LocationMarkerIcon } from '@heroicons/react/solid'

// need to give blurhash a fallback in case the image doesn't load
// need to have the loading and failure states set up for this subcmp
// also the empty situation for the image searech
// how to add cancelling to the useFetch - will need to setup abort controller
export default function Now() {
  const date = getCurrentDateString()
  const time = getCurrentTimeString()

  const UnsplashPhotosCell = useUnsplashPhotos('Vancouver')
  const Loading = () => <p>loading</p>
  const Failure = () => <p>fuck</p>
  const Success = ({
    response: { results },
  }: {
    response: UnsplashPhotSearchResponse
  }) => {
    const randomPhotoIndex = getRandomNumFromRange(0, results.length)
    return (
      <div
        className="absolute top-0 left-0 bottom-0 right-0 w-full h-full rounded-lg"
        style={{ zIndex: -1 }}
      >
        <ImageWithBlurHash
          hash={results[randomPhotoIndex].blur_hash}
          url={results[randomPhotoIndex].urls.full}
          attribution={{
            url: results[randomPhotoIndex].user.links.html,
            name: `${results[randomPhotoIndex].user.first_name} ${results[randomPhotoIndex].user.last_name}`,
          }}
        />
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex pb-2 justify-center items-center text-gray-600">
        <p className="text-sm">I'm currently living in</p>
        <p className="flex pl-2 gap-x-2 justify-center items-center text-black">
          <LocationMarkerIcon className="h-5 w-5 text-blue-500" />
          <span className="border-b-2 border-blue-500">Vancouver, Canada</span>
        </p>
      </div>
      <div
        className="rounded-lg relative isolate w-full"
        style={{ zIndex: -20 }}
      >
        <UnsplashPhotosCell
          Loading={Loading}
          Failure={Failure}
          Success={Success}
        />
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
