import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY
const buildCurrentWeatherUrl = (
  cityName: string,
  stateCode: string,
  countryCode: string,
) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateCode},${countryCode}&units=metric&appid=${OPEN_WEATHER_API_KEY}`

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let currentWeatherRes = await fetch(
    buildCurrentWeatherUrl('Vancouver', 'BC', 'CA'),
  )
  res.json(await currentWeatherRes.json())
}
