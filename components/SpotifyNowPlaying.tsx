import useSpotifyCurrentlyPlaying from '../hooks/useSpotifyCurrentlyPlaying'

export default function SpotifyNowPlaying() {
  const SpotifyCurrentlyPlayingCell = useSpotifyCurrentlyPlaying()

  const Failure = () => <p>fuck</p>
  const Loading = () => <p>loading...</p>
  const Success = ({
    response: playback,
  }: {
    response: SpotifyApi.CurrentlyPlayingObject
  }) => {
    let imgUrl
    let artist
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
      artist = playback.item.show
    }

    return (
      <>
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
        <div className="flex gap-x-4 pt-4">
          <img src={imgUrl} className="h-16 w-16" />
          <div className="flex flex-col justify-around">
            <p className="text-sm font-bold">{playback.item.name}</p>
            <p className="text-xs text-gray-300">{artist}</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className=" bg-black text-white rounded-lg relative bottom-8 p-6 mx-2 backdrop-filter backdrop-blur-lg bg-opacity-40">
      <SpotifyCurrentlyPlayingCell
        Failure={Failure}
        Loading={Loading}
        Success={Success}
      />
    </div>
  )
}
