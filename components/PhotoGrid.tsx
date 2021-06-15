import { LocationMarkerIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import useMobileResize from '../hooks/useMobileResize'

const LocationPhoto = ({ location, imgUrl, top = false }) => {
  //const [isTopMarker, setIsTopMarker] = useState(top)

  //useMobileResize([(b: boolean) => setIsTopMarker(b || top)])

  return (
    <div className="relative">
      <div
        className={`absolute left-0 bg-gray-100 w-full h-10 flex items-center justify-center py-4 px-2 ${
          top ? '-top-1 rounded-t-lg' : '-bottom-1 rounded-b-lg'
        }`}
      >
        <div className="flex items-center gap-x-3">
          <LocationMarkerIcon className="h-5 w-5 text-blue-500" />
          <p className="text-xs font-semibold">{location}</p>
        </div>
      </div>
      <img src={imgUrl} className="rounded-lg" />
    </div>
  )
}

export const PhotoGrid = () => {
  // 2 cols
  return (
    <div className="flex justify-between relative sm:gap-16 gap-8 flex-col sm:flex-row sm:pt-0 pt-8">
      <div className="absolute z-30 flex justify-center sm:items-center items-start w-full h-full">
        <img
          src="/myles.png"
          className="block w-36 sm:w-32 rounded-lg p-3 sm:p-0 bg-white -translate-y-16 transform sm:translate-y-0"
        />
      </div>
      <div className="flex gap-y-8 sm:flex-col flex-col-reverse">
        <div>
          <LocationPhoto
            imgUrl="/whistler.jpeg"
            location="Whistler, BC, Canada"
            top
          />
        </div>
        <div className="sm:translate-x-12 sm:transform">
          <LocationPhoto
            imgUrl="/toubkal-summit.jpeg"
            location="Mount Toubkal, Morocco"
          />
        </div>
      </div>
      <div className="sm:translate-y-8 sm:transform">
        <LocationPhoto
          location="Humantay Lake, Peru"
          imgUrl="/salkantay-lake.jpeg"
          top
        />
      </div>
    </div>
  )
}

export const PhotoGrid2 = () => {
  const [isMobile, setIsMobile] = useState(false)

  useMobileResize([setIsMobile])

  const heroImageClasses = isMobile ? '' : 'absolute top-1/2 z-30'
  return (
    <div className="relative w-full flex-col flex">
      <div className="flex justify-center items-center translate-y-4 transform z-30">
        <img
          src="/myles.png"
          className={`w-32 rounded-lg  ${heroImageClasses}`}
        />
      </div>
      <div className={`${isMobile ? 'w-full' : 'w-64'} top-24 right-60 z-20`}>
        <LocationPhoto
          location="Humantay Lake, Salkantay, Peru"
          imgUrl="/salkantay-lake.jpeg"
        />
      </div>
      <div
        className={`${
          isMobile ? 'w-full' : 'w-52'
        } -bottom-24 right-0 z-0 rounded-lg`}
      >
        <LocationPhoto
          imgUrl="/toubkal-summit.jpeg"
          location="Mount Toubkal, Morocco"
        />
      </div>
      <div
        className={`${
          isMobile ? 'w-full' : 'w-52'
        } top-0 right-12 z-10 rounded-lg`}
      >
        <LocationPhoto
          imgUrl="/whistler.jpeg"
          location="Whistler, BC, Canada"
          top
        />
      </div>
    </div>
  )
}
