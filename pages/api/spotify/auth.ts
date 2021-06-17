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

type SpotifyTopTimeRange = 'long_term' | 'medium_term' | 'short-term'
// TODO: type needed - also see that there's error details available linked https://developer.spotify.com/documentation/web-api/reference/#category-personalization
const getUserTop = async (
  accessToken: string,
  type: 'artists' | 'tracks',
  timeRange: SpotifyTopTimeRange = 'medium_term',
  limit: number = 20,
  offset: number = 0,
) => {
  const SPOTIFY_TOP_ENDPOINT = `https://api.spotify.com/v1/me/top/${type}`
  const url = new URL(SPOTIFY_TOP_ENDPOINT)
  url.searchParams.append('time_range', timeRange)
  url.searchParams.append('limit', String(limit))
  url.searchParams.append('offset', String(offset))
  let topRes = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  return topRes.json()
}

// const getUserCurrentlyPlaying = (accessToken: string) => {}

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
  let json = await authRes.json()

  console.log(`json ${JSON.stringify(json, null, 2)}`)
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
