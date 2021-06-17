import { useState, useEffect } from 'react'
import { PauseIcon, PlayIcon } from '@heroicons/react/solid'
import useSpotifyCurrentlyPlaying from '../hooks/useSpotifyCurrentlyPlaying'

function ProgressBar({ progressMs, durationMs, onComplete = () => {} }) {
  const [progress, setProgress] = useState(progressMs)
  useEffect(() => {
    let interval = setInterval(() => {
      if (progress < durationMs) {
        setProgress(progress + 1000)
      } else {
        onComplete()
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  })
  return (
    <div className="shadow w-full bg-gray-400 rounded-xl">
      <div
        className="bg-white p-0.5 rounded-xl"
        style={{
          width: `${Math.round((progress / durationMs) * 100)}%`,
        }}
      ></div>
    </div>
  )
}

export default function SpotifyNowPlaying() {
  const [SpotifyCurrentlyPlayingCell, refresh] = useSpotifyCurrentlyPlaying()

  const Failure = () => <p>fuck</p>
  const Loading = () => <p>loading...</p>
  const Success = ({
    response: playback,
  }: {
    response: SpotifyApi.CurrentlyPlayingObject
  }) => {
    let imgUrl: string | undefined
    let artist: string | undefined
    if (
      playback.currently_playing_type === 'track' &&
      'album' in playback.item
    ) {
      imgUrl = playback.item.album.images[1].url
      artist = playback.item.artists[0].name
    } else if (
      playback.currently_playing_type === 'episode' &&
      'images' in playback.item
    ) {
      imgUrl = playback.item.images[1].url
      artist = playback.item.show.name
    }

    return (
      <div>
        <div className="flex gap-x-4 pt-4">
          <img src={imgUrl} className="h-16 w-16" />
          <div className="flex flex-col justify-around">
            <p className="text-sm font-bold">{playback.item.name}</p>
            <p className="text-xs text-gray-300">{artist}</p>
          </div>
        </div>
        <div className="flex justify-center items-center pt-2 gap-x-2">
          {playback.is_playing ? (
            <PauseIcon className="h-5 w-5" />
          ) : (
            <PlayIcon className="h-5 w-5" />
          )}
          <ProgressBar
            progressMs={playback.progress_ms}
            durationMs={playback.item.duration_ms}
            onComplete={() => refresh()}
          />
        </div>
      </div>
    )
  }

  return (
    <div className=" bg-black text-white rounded-lg relative bottom-8 p-6 mx-2 backdrop-filter backdrop-blur-lg bg-opacity-40">
      <div className="flex gap-x-4 justify-start items-center">
        <div>
          <img
            src="/spotify-icon-logo.svg"
            alt="Spotify Icon Logo"
            className="h-6 w-6"
          />
        </div>
        <p className="font-bold text-sm">Now Playing</p>
      </div>
      <SpotifyCurrentlyPlayingCell
        Failure={Failure}
        Loading={Loading}
        Success={Success}
      />
    </div>
  )
}
