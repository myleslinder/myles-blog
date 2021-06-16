import type { NextApiRequest, NextApiResponse } from 'next'

const SPOTIFY_AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
const scopes: SpotifyAuthScope[] = [
  'user-library-read',
  'playlist-modify-private',
  'ugc-image-upload',
  'user-read-playback-state',
]

const buildRedirectUrl = () => {
  const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
  const BASE_URL = process.env.BASE_URL
  const REDIRECT_URI = '/api/spotify/auth'

  let url = new URL(SPOTIFY_AUTH_ENDPOINT)
  url.searchParams.append('response_type', 'code')
  url.searchParams.append('client_id', SPOTIFY_CLIENT_ID)
  url.searchParams.append('scope', scopes.join(' '))

  const fullRedirectUri = `${BASE_URL}${REDIRECT_URI}`
  url.searchParams.append('redirect_uri', fullRedirectUri)

  // what about the state param?
  return url
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.redirect(buildRedirectUrl().toString())
}

/**
 * MARK - Type definitions
 */

type SpotifyAuthScope =
  | 'ugc-image-upload'
  | 'user-read-recently-played'
  | 'user-top-read'
  | 'user-read-playback-position'
  | 'user-read-playback-state'
  | 'user-modify-playback-state'
  | 'user-read-currently-playing'
  | 'app-remote-control'
  | 'streaming'
  | 'playlist-modify-public'
  | 'playlist-modify-private'
  | 'playlist-read-private'
  | 'playlist-read-collaborative'
  | 'user-follow-modify'
  | 'user-follow-read'
  | 'user-library-modify'
  | 'user-library-read'
  | 'user-read-email'
  | 'user-read-private'
