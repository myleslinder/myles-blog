import { PauseIcon, PlayIcon } from '@heroicons/react/solid'
import useSpotifyCurrentlyPlaying from '../hooks/useSpotifyCurrentlyPlaying'
import ProgressBar from './ProgressBar'

const Loading = () => {
  return (
    <div>
      <div className="flex gap-x-4 pt-4">
        <div className="h-16 w-16 bg-gray-800 animate-pulse"></div>
        <div className="flex flex-col justify-around">
          <p className="w-24 bg-gray-800 h-4 animate-pulse"></p>
          <p className="w-16 bg-gray-800 h-2 animate-pulse"></p>
        </div>
      </div>
      <div className="flex justify-center items-center pt-2 gap-x-2">
        <div className="pl-0.5 h-4 w-4 bg-gray-800 rounded-full animate-pulse"></div>
        <ProgressBar progressMs={0} durationMs={1000} paused />
      </div>
    </div>
  )
}

const Success = (
  {
    response: playback,
  }: {
    response: SpotifyApi.CurrentlyPlayingObject
  },
  refresh: () => void,
) => {
  let imgUrl: string
  let artist: string
  let itemName: string
  if (playback.currently_playing_type === 'track' && 'album' in playback.item) {
    imgUrl = playback.item.album.images[1].url
    artist = playback.item.artists[0].name
    itemName = playback.item.name
  } else if (
    playback.currently_playing_type === 'episode' &&
    'images' in playback.item
  ) {
    imgUrl = playback.item.images[1].url
    artist = playback.item.show.name
    itemName = playback.item.name
  } else {
    artist = 'Nothing playing'
    itemName = 'No Artist'
  }

  return (
    <div>
      <div className="flex gap-x-4 pt-4">
        {imgUrl ? (
          <img src={imgUrl} className="h-16 w-16" />
        ) : (
          <div className="h-16 w-16 bg-gray-800 "></div>
        )}
        <div className="flex flex-col justify-around">
          <p className="text-sm font-bold">{itemName}</p>
          <p className="text-xs text-gray-300">{artist}</p>
        </div>
      </div>
      <div className="flex justify-center items-center pt-2 gap-x-2">
        {playback.is_playing ? (
          <PlayIcon className="h-5 w-5" />
        ) : (
          <PauseIcon className="h-5 w-5" />
        )}
        <ProgressBar
          progressMs={playback?.progress_ms || 0}
          durationMs={playback?.item?.duration_ms || 10}
          paused={!playback.is_playing}
          onComplete={() => refresh()}
        />
      </div>
    </div>
  )
}
export default function SpotifyNowPlaying() {
  const SpotifyCurrentlyPlayingCell = useSpotifyCurrentlyPlaying()

  return (
    <div className=" bg-black text-white rounded-lg relative bottom-8 p-6 mx-2 backdrop-filter backdrop-blur-lg bg-opacity-40">
      <div className="flex gap-x-4 justify-start items-center">
        <div>
          <img
            src="/spotify-icon-logo.svg"
            alt="Spotify Icon Logo"
            className="h-4 w-4"
          />
        </div>
        <p className="font-bold text-xs">Now Playing</p>
      </div>
      <SpotifyCurrentlyPlayingCell
        Failure={Loading}
        Loading={Loading}
        Success={Success}
      />
    </div>
  )
}
