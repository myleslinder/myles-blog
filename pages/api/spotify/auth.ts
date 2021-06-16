import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

const BASE_URL = process.env.BASE_URL

const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const REDIRECT_URI = '/api/spotify/auth'

const getCurrentUserProfile = async (
  accessToken: string,
): Promise<SpotifyUser> => {
  const SPOTIFY_USER_PROFILE_ENDPOINT = 'https://api.spotify.com/v1/me'

  let meRes = await fetch(SPOTIFY_USER_PROFILE_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  return meRes.json()
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

  try {
    let authRes = await fetch(paramsUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    let json = await authRes.json()

    let spotifyUser = await getCurrentUserProfile(json.access_token)

    res.redirect(301, `/?${spotifyUser.id}`)
  } catch (e: any) {
    console.log(e)
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  return handleInitialAuthorization(
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
