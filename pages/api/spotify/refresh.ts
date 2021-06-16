import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

const handleRefreshAuth = async userId => {
  let paramsUrl = new URL(authEndpoint)
  paramsUrl.searchParams.append('grant_type', 'refresh_token')
  let refresh_token = await MYLES_TODOS.get(
    `user:${userId}:refresh_token`,
    'text',
  )

  paramsUrl.searchParams.append('refresh_token', refresh_token)
  let credentials = `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  let Authorization = `Basic ${btoa(credentials)}`
  let res = await fetch(paramsUrl.toString(), {
    method: 'POST',
    headers: {
      Authorization,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  let json = await res.json()
  if (json.refresh_token) {
    await MYLES_TODOS.put(`user:${userId}:refresh_token`, json.refresh_token)
  }
  await MYLES_TODOS.put(`user:${userId}:access_token`, json.access_token, {
    expirationTtl: json.expires_in,
  })
  return json
}

export default (req: NextApiRequest, res: NextApiResponse) => {}
