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
      <img src={imgUrl} className="rounded-lg" alt="" />
    </div>
  )
}

export const PhotoGrid = () => {
  // 2 cols
  return (
    <div className="flex justify-between relative flex-col sm:flex-row sm:pt-0 pt-8 gap-x-8">
      <div className="absolute z-30 flex justify-center sm:items-center items-start w-full h-full sm:py-16 py-8">
        <img
          src="/myles.png"
          className="block w-36 sm:w-32 rounded-lg p-3 sm:p-0 bg-white -translate-y-16 transform sm:translate-y-0"
          alt="A picture of myles' face"
        />
      </div>
      <div className="flex sm:flex-col flex-col-reverse pt-8">
        <div className="py-8">
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
