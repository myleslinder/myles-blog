import getRandomNumFromRange from '../utils/getRandomNumFromRange'
import useFetch, { FetchState } from './useFetch'

const buildIconUrl = (iconCode: string) =>
  `http://openweathermap.org/img/wn/${iconCode}@2x.png`

const formatDescription = (desc: string) =>
  desc
    .split(' ')
    .map((w: string) => `${w[0].toUpperCase()}${w.substring(1)}`)
    .join(' ')

const formatTemp = (temp: number) => `${Math.round(temp)}℃`

const fetchCurrentWeather = async (): Promise<OpenWeatherCurrentResponse> => {
  let res = await fetch('/api/weather/current')
  return await res.json()
}

const postfetch = (
  state: FetchState<{ loadingText: string }, OpenWeatherCurrentResponse>,
): FetchState<
  { loadingText: string },
  OpenWeatherCurrentResponse & CustomWeatherAttributes
> => {
  if (state.status === 'RESOLVED') {
    const formattedDescription = formatDescription(
      state.response.weather[0].description,
    )
    const formattedTemp = formatTemp(state.response.main.temp)
    const iconUrl = buildIconUrl(state.response.weather[0].icon)
    return {
      ...state,
      response: {
        ...state.response,
        formattedDescription,
        formattedTemp,
        iconUrl,
      },
    }
  } else {
    return {
      ...state,
      response: {
        ...state.response,
        formattedDescription: '',
        formattedTemp: '',
        iconUrl: '',
      },
    }
  }
}

const weatherLoadingOptions = [
  'Scanning the skies...',
  'Calibrating weather balloons...',
  'Browsing the horizon...',
]
const loadingText =
  weatherLoadingOptions[
    getRandomNumFromRange(0, weatherLoadingOptions.length - 1)
  ]

export default function useCurrentWeather() {
  const [state, buildCellComponent] = useFetch(fetchCurrentWeather, () => ({
    loadingText,
  }))

  let newState = postfetch(state)
  return buildCellComponent(newState)
}

/**
 * MARK - Type definitions
 */

export type ResolvedCurrentWeatherResponse = OpenWeatherCurrentResponse &
  CustomWeatherAttributes

type CustomWeatherAttributes = {
  formattedDescription: string
  formattedTemp: string
  iconUrl: string
}

type OpenWeatherCurrentResponse = {
  coord: {
    lon: number
    lat: number
  }
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    message: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}
