import { useEffect, useReducer } from 'react'
import getRandomNumFromRange from '../utils/getRandomNumFromRange'

const buildIconUrl = (iconCode: string) =>
  `http://openweathermap.org/img/wn/${iconCode}@2x.png`

const formatDescription = (desc: string) =>
  desc
    .split(' ')
    .map((w: string) => `${w[0].toUpperCase()}${w.substring(1)}`)
    .join(' ')

const formatTemp = (temp: number) => `${Math.round(temp)}℃`

const currentWeatherReducer = (
  state: CurrentWeather,
  action: {
    type: string
    weather?: (OpenWeatherCurrentResponse & CustomWeatherAttributes) | null
    loadingText?: string
    error?: any
  },
) => {
  switch (action.type) {
    case 'ERROR': {
      return {
        ...state,
        status: 'REJECTED' as PromiseStatus,
        error: action.error,
      }
    }
    case 'STARTED': {
      return {
        ...state,
        status: 'PENDING' as PromiseStatus,
        loadingText: action.loadingText,
      }
    }
    case 'SUCCESS': {
      return {
        ...state,
        status: 'RESOLVED' as PromiseStatus,
        weather: action.weather,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const handleSuccess = dispatch => (json: OpenWeatherCurrentResponse) => {
  const formattedDescription = formatDescription(json.weather[0].description)
  const formattedTemp = formatTemp(json.main.temp)
  const iconUrl = buildIconUrl(json.weather[0].icon)
  dispatch({
    type: 'SUCCESS',
    weather: {
      ...json,
      formattedDescription,
      formattedTemp,
      iconUrl,
    },
  })
}

const handleError = dispatch => (e: any) => {
  dispatch({
    type: 'ERROR',
    error: e,
  })
}

const fetchCurrentWeather = async (onRes, onRej) => {
  try {
    let res = await fetch('/api/weather/current')
    onRes(await res.json())
  } catch (e) {
    onRej(e)
  }
}

const weatherLoadingOptions = [
  'Scanning the skies...',
  'Calibrating weather balloons...',
  'Browsing the horizon...',
]

export default function useCurrentWeather(): CurrentWeather {
  const [state, dispatch] = useReducer(currentWeatherReducer, {
    status: 'IDLE',
    loadingText: null,
    weather: null,
    error: null,
  })

  const success = handleSuccess(dispatch)
  const error = handleError(dispatch)

  useEffect(() => {
    dispatch({
      type: 'STARTED',
      loadingText:
        weatherLoadingOptions[
          getRandomNumFromRange(0, weatherLoadingOptions.length)
        ],
    })
    fetchCurrentWeather(success, error)
  }, [])

  return state
}

/**
 * MARK - Type definitions
 */

type PromiseStatus = 'IDLE' | 'PENDING' | 'ERROR' | 'RESOLVED'
type CurrentWeather = {
  status: PromiseStatus
  loadingText?: string
  error: any
  weather: (OpenWeatherCurrentResponse & CustomWeatherAttributes) | null
}

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
