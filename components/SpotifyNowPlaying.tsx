export default function SpotifyNowPlaying() {
  return (
    <div className=" bg-black text-white rounded-lg relative bottom-4 p-6 mx-2 backdrop-filter backdrop-blur-lg bg-opacity-40">
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
        <div className="bg-green-600 h-16 w-16"></div>
        <div className="flex flex-col justify-around">
          <p className="text-sm font-bold">Song Name</p>
          <p className="text-xs text-gray-300">Artist Name</p>
        </div>
      </div>
    </div>
  )
}
