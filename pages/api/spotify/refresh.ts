import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

const handleRefreshAuth = async (refreshToken: string) => {
  const paramsUrl = new URL(SPOTIFY_TOKEN_ENDPOINT)
  paramsUrl.searchParams.append('grant_type', 'refresh_token')

  paramsUrl.searchParams.append('refresh_token', refreshToken)
  let credentials = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  // const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
  let Authorization = `Basic ${btoa(credentials)}`
  let res = await fetch(paramsUrl.toString(), {
    method: 'POST',
    headers: {
      Authorization,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  return await res.json()
}

export default (req: NextApiRequest, res: NextApiResponse) => {}
