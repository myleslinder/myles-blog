import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

const BASE_URL = process.env.BASE_URL

const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const REDIRECT_URI = '/api/spotify/auth'

// TODO: error handling

const getCurrentUserProfile = async (
  accessToken: string,
): Promise<SpotifyUser> => {
  const SPOTIFY_USER_PROFILE_ENDPOINT = 'https://api.spotify.com/v1/me'

  let meRes = await fetch(SPOTIFY_USER_PROFILE_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  return meRes.json()
}

const getUserPlayback = async (
  accessToken: string,
): Promise<SpotifyPlayback> => {
  const SPOTIFY_PLAYER_ENDPOINT = 'https://api.spotify.com/v1/me/player'
  const url = new URL(SPOTIFY_PLAYER_ENDPOINT)
  // url.searchParams.append('market', 'from-token')
  url.searchParams.append('additional_types', 'track,episode')
  let playerRes = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  return playerRes.json()
}

const handleInitialAuthorization = async (
  res: NextApiResponse,
  code: string,
  redirectUri: string,
) => {
  let paramsUrl = new URL(SPOTIFY_TOKEN_ENDPOINT)
  paramsUrl.searchParams.append('grant_type', 'authorization_code')
  paramsUrl.searchParams.append('code', code)
  paramsUrl.searchParams.append('redirect_uri', redirectUri)
  paramsUrl.searchParams.append('client_id', process.env.SPOTIFY_CLIENT_ID)
  paramsUrl.searchParams.append(
    'client_secret',
    process.env.SPOTIFY_CLIENT_SECRET,
  )

  let authRes = await fetch(paramsUrl.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  let { access_token } = await authRes.json()
  //let spotifyUser = await getCurrentUserProfile(access_token)
  const r = await getUserPlayback(access_token)

  console.log(`r ${JSON.stringify(r, null, 2)}`)
  res.redirect(301, `/`)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return await handleInitialAuthorization(
    res,
    req.query.code as string,
    `${BASE_URL}${REDIRECT_URI}`,
  )
}

/**
 * MARK - Type definitions
 */

type SpotifyUser = {
  country: string | undefined
  display_name: string | null
  email: string | undefined
  explicit_content: {
    filter_enabled: boolean
    filter_locked: boolean
  }
  external_urls: {
    spotify: string
  }
  followers: {
    href: null
    total: number
  }
  href: string
  id: string
  images: SpotifyImageObject[]
  product: 'premium' | 'free' | 'open' | undefined
  type: 'user'
  uri: string
}

type SpotifyImageObject = {
  height: number
  url: string
  width: number
}

type SpotifyPlayback = {
  timestamp: number
  device: {
    id: string
    is_active: boolean
    is_restricted: boolean
    name: string
    type: string
    volume_percent: number
  }
  progress_ms: number
  is_playing: boolean
  currently_playing_type: 'track' | 'episode' | 'ad' | 'unknown'
  item: SpotifyTrackObject | SpotifyEpisodeObject | null
  shuffle_state: boolean
  repeat_state: 'off' | 'track' | 'context'
  context: SpotifyContextObject | null
}

type SpotifyTrackObject = {}

type SpotifyEpisodeObject = {}

type SpotifyContextObject = {
  external_urls: {
    spotify: string
  }
  href: string
  type: string
  uri: string
}
