import useFetch from './useFetch'

const fetchSpotifyCurrentlyPlaying =
  async (): Promise<SpotifyApi.CurrentlyPlayingObject> => {
    let res = await fetch('/api/spotify/refresh')
    return await res.json()
  }

export default function useSpotifyCurrentlyPlaying() {
  const [fetchState, buildCellComponent, refresh] = useFetch(
    fetchSpotifyCurrentlyPlaying,
  )

  return [buildCellComponent(fetchState), refresh]
}
