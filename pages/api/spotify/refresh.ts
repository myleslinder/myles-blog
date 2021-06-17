import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'
import initMiddleware from '../../../lib/init-middleware'
import Cors from 'cors'
import simpleProtect from '../../../lib/simple-protect'

const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

const origin = `${process.env.VERCEL_URL ? 'https://' : 'http://'}${
  process.env.VERCEL_URL || process.env.BASE_URL
}`

const cors = initMiddleware(
  Cors({
    origin,
    // Only allow requests with GET and OPTIONS
    methods: ['GET', 'OPTIONS'],
  }),
)

const getUserPlayback = async (
  accessToken: string,
): Promise<SpotifyPlayback | {}> => {
  //const SPOTIFY_PLAYER_ENDPOINT = 'https://api.spotify.com/v1/me/player'
  // this endpoint has the same params but a slightly different response wihtout device info
  const SPOTIFY_CURRENTLY_PLAYING_ENDPOINT =
    'https://api.spotify.com/v1/me/player/currently-playing'
  const url = new URL(SPOTIFY_CURRENTLY_PLAYING_ENDPOINT)
  // url.searchParams.append('market', 'from-token')
  url.searchParams.append('additional_types', 'track,episode')
  let playerRes: Response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (
    playerRes.headers.has('content-type') &&
    playerRes.headers.get('content-type') === 'application/json'
  ) {
    return playerRes.json()
  }
  return {}
}

const handleRefreshAuth = async (refreshToken: string) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const paramsUrl = new URL(SPOTIFY_TOKEN_ENDPOINT)
  paramsUrl.searchParams.append('grant_type', 'refresh_token')

  paramsUrl.searchParams.append('refresh_token', refreshToken)
  let credentials = `${clientId}:${clientSecret}`
  const basic = Buffer.from(credentials).toString('base64')
  let Authorization = `Basic ${basic}`
  let res = await fetch(paramsUrl.toString(), {
    method: 'POST',
    headers: {
      Authorization,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  return await res.json()
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res)
  if (simpleProtect(req.cookies)) {
    let { access_token: accessToken } = await handleRefreshAuth(
      process.env.SPOTIFY_REFRESH_TOKEN,
    )

    res.json(await getUserPlayback(accessToken))
    return
  }
  res.json({})
}

/**
 * MARK - Type Declarations
 */

export type SpotifyPlayback = {
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
